import java.util.LinkedList;
import java.util.Queue;

class TicketPool {
    private final int maximumTicketCapacity;
    private final Queue<Ticket> ticketQueue;
    private int totalTicketsAdded = 0;
    private int totalTicketsSold = 0;
    private final int totalTickets;

    public TicketPool(int maximumTicketCapacity) {
        this.maximumTicketCapacity = maximumTicketCapacity;
        this.ticketQueue = new LinkedList<>();
        this.totalTickets = Main.loadConfiguration().totalTickets;
    }

    public synchronized void addTicket(Ticket ticket, int vendorId) {
        while (Main.running.get() && (ticketQueue.size() >= maximumTicketCapacity || totalTicketsAdded >= totalTickets)) {
            if (totalTicketsAdded >= totalTickets) {
                return;
            }
            try {
                wait();
            } catch (InterruptedException e) {
                return;
            }
        }
        if (!Main.running.get()) return;
        ticketQueue.add(ticket);
        totalTicketsAdded++;
        System.out.println("Ticket added by Vendor ID-" + vendorId + " / current size is - " + ticketQueue.size());
        notifyAll();
    }

    public synchronized Ticket buyTicket(int customerId) {
        while (Main.running.get() && ticketQueue.isEmpty()) {
            if (totalTicketsSold >= totalTickets) {
                return null;
            }
            try {
                System.out.println("Customer ID-" + customerId + " is waiting for tickets.....");
                wait();
            } catch (InterruptedException e) {
                return null;
            }
        }
        if (!Main.running.get()) return null;
        Ticket ticket = ticketQueue.poll();
        if (ticket != null) {
            totalTicketsSold++;
            System.out.println("Ticket bought by Customer ID-" + customerId + " / current size is - " + ticketQueue.size() + " / Ticket is - " + ticket);
        }
        notifyAll();
        return ticket;
    }
}