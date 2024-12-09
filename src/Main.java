import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.io.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Scanner;
import java.util.concurrent.atomic.AtomicBoolean;

public class Main {
    private static final String CONFIG_FILE = "config.json";
    public static final AtomicBoolean running = new AtomicBoolean(true);

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Configuration config;

        System.out.println("Welcome to the Event Ticketing System!");

        if (new File(CONFIG_FILE).exists()) {
            System.out.print("Do you want to load the previous configuration? (yes/no): ");
            String usePreviousConfig = scanner.nextLine();
            if (usePreviousConfig.equalsIgnoreCase("yes")) {
                config = loadConfiguration();
            } else {
                config = getNewConfiguration(scanner);
            }
        } else {
            config = getNewConfiguration(scanner);
        }

        saveConfiguration(config);

        TicketPool ticketPool = new TicketPool(config.maxTicketCapacity);

        Thread[] vendorThreads = new Thread[config.numberOfVendors];
        for (int i = 0; i < config.numberOfVendors; i++) {
            Vendor vendor = new Vendor(i + 1, config.ticketReleaseRate, ticketPool, config.totalTickets);
            vendorThreads[i] = new Thread(vendor);
            vendorThreads[i].start();
        }

        Thread[] customerThreads = new Thread[config.numberOfCustomers];
        Customer[] customers = new Customer[config.numberOfCustomers];
        for (int i = 0; i < config.numberOfCustomers; i++) {
            customers[i] = new Customer(ticketPool, config.customerRetrievalRate, i + 1);
            customerThreads[i] = new Thread(customers[i]);
            customerThreads[i].start();
        }

        Thread inputThread = new Thread(() -> {
            Scanner inputScanner = new Scanner(System.in);
            System.out.println("Press 's' and Enter to stop the simulation at any time.");
            while (running.get()) {
                if (inputScanner.hasNextLine()) {
                    String input = inputScanner.nextLine();
                    if (input.equalsIgnoreCase("s")) {
                        running.set(false);
                        System.out.println("Stopping the simulation...");
                        break;
                    }
                }
            }
        });
        inputThread.start();

        while (running.get()) {
            boolean allFinished = true;
            for (Thread thread : vendorThreads) {
                if (thread.isAlive()) {
                    allFinished = false;
                    break;
                }
            }
            for (Thread thread : customerThreads) {
                if (thread.isAlive()) {
                    allFinished = false;
                    break;
                }
            }
            if (allFinished) {
                running.set(false);
            }
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        for (Thread thread : vendorThreads) {
            thread.interrupt();
        }
        for (Thread thread : customerThreads) {
            thread.interrupt();
        }

        for (Thread thread : vendorThreads) {
            try {
                thread.join();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        for (Thread thread : customerThreads) {
            try {
                thread.join();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        System.out.println("\nTickets Sold:");
        int totalSold = 0;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        for (Customer customer : customers) {
            List<Ticket> purchasedTickets = customer.getPurchasedTickets();
            for (Ticket ticket : purchasedTickets) {
                String currentDateTime = LocalDateTime.now().format(formatter);
                System.out.println("[" + currentDateTime + "] Customer ID-" + customer.customerId + " purchased: " + ticket);
                totalSold++;
            }
        }

        System.out.println("Simulation stopped. Total tickets sold: " + totalSold);
    }

    private static Configuration getNewConfiguration(Scanner scanner) {
        System.out.print("Enter total number of tickets: ");
        int totalTickets = scanner.nextInt();
        scanner.nextLine();

        System.out.print("Enter number of vendors: ");
        int numberOfVendors = scanner.nextInt();
        scanner.nextLine();

        System.out.print("Enter number of customers: ");
        int numberOfCustomers = scanner.nextInt();
        scanner.nextLine();

        System.out.print("Enter ticket release rate (per second): ");
        int ticketReleaseRate = scanner.nextInt();
        scanner.nextLine();

        System.out.print("Enter customer retrieval rate (per second): ");
        int customerRetrievalRate = scanner.nextInt();
        scanner.nextLine();

        System.out.print("Enter maximum ticket capacity: ");
        int maxTicketCapacity = scanner.nextInt();
        scanner.nextLine();

        return new Configuration(totalTickets, numberOfVendors, numberOfCustomers, ticketReleaseRate, customerRetrievalRate, maxTicketCapacity);
    }

    private static void saveConfiguration(Configuration config) {
        try (Writer writer = new FileWriter(CONFIG_FILE)) {
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            gson.toJson(config, writer);
        } catch (IOException e) {
            System.out.println("Failed to save configuration: " + e.getMessage());
        }
    }

    static Configuration loadConfiguration() {
        try (Reader reader = new FileReader(CONFIG_FILE)) {
            Gson gson = new Gson();
            return gson.fromJson(reader, Configuration.class);
        } catch (IOException e) {
            System.out.println("Failed to load configuration: " + e.getMessage());
            return null;
        }
    }
}