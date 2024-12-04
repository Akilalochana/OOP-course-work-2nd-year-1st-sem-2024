import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.io.*;
import java.util.Scanner;

public class Main {
    private static final String CONFIG_FILE = "config.json";

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

        Thread[] vendorThreads = new Thread[config.totalTickets];
        Thread[] customerThreads = new Thread[config.totalTickets];

        // Create and start Vendor threads
        for (int i = 0; i < config.totalTickets; i++) {
            Vendor vendor = new Vendor(i + 1, config.ticketReleaseRate, ticketPool);
            vendorThreads[i] = new Thread(vendor, "Vendor-" + (i + 1));
            vendorThreads[i].start();
        }

        // Create and start Customer threads
        for (int i = 0; i < config.totalTickets; i++) {
            Customer customer = new Customer(ticketPool, config.customerRetrievalRate, i + 1);
            customerThreads[i] = new Thread(customer, "Customer-" + (i + 1));
            customerThreads[i].start();
        }

        // Wait for all threads to complete
        try {
            for (Thread vendorThread : vendorThreads) {
                vendorThread.join();
            }
            for (Thread customerThread : customerThreads) {
                customerThread.join();
            }
        } catch (InterruptedException e) {
            System.out.println("Error waiting for threads to finish: " + e.getMessage());
        }

        System.out.println("All tickets have been processed. System shutting down.");
    }

    private static Configuration getNewConfiguration(Scanner scanner) {
        System.out.print("Enter total number of tickets: ");
        int totalTickets = scanner.nextInt();
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

        return new Configuration(totalTickets, ticketReleaseRate, customerRetrievalRate, maxTicketCapacity);
    }

    private static void saveConfiguration(Configuration config) {
        try (Writer writer = new FileWriter(CONFIG_FILE)) {
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            gson.toJson(config, writer);
        } catch (IOException e) {
            System.out.println("Failed to save configuration: " + e.getMessage());
        }
    }

    private static Configuration loadConfiguration() {
        try (Reader reader = new FileReader(CONFIG_FILE)) {
            Gson gson = new Gson();
            return gson.fromJson(reader, Configuration.class);
        } catch (IOException e) {
            System.out.println("Failed to load configuration: " + e.getMessage());
            return null;
        }
    }
}