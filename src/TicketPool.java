import java.util.LinkedList;
import java.util.Queue;

public class TicketPool {
    private final int maximumTicketCapacity;
    private final Queue<Ticket> ticketQueue;

    public TicketPool(int maximumTicketCapacity) {
        this.maximumTicketCapacity = maximumTicketCapacity;
        this.ticketQueue = new LinkedList<>();
    }

    public synchronized void addTicket(Ticket ticket, int vendorId) {
        while (ticketQueue.size() >= maximumTicketCapacity) {
            try {
                wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        ticketQueue.add(ticket);
        System.out.println("Ticket added by Vendor ID-" + vendorId + " - current size is - " + ticketQueue.size());
        notifyAll();
    }

    public synchronized Ticket buyTicket(int customerId) {
        while (ticketQueue.isEmpty()) {
            try {
                System.out.println("Customer ID-" + customerId + " is waiting for tickets.");
                wait(); // Customer waits when there are no tickets available
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        Ticket ticket = ticketQueue.poll();
        System.out.println("Ticket bought by Customer ID-" + customerId + " - current size is - " + ticketQueue.size() + " - Ticket is - " + ticket);
        notifyAll();
        return ticket;
    }
}
