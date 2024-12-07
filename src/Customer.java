import java.util.ArrayList;
import java.util.List;

public class Customer implements Runnable{
    private final TicketPool ticketPool;
    private final int customerRetrievalRate;
    final int customerId;
    private final List<Ticket> purchasedTickets;

    public Customer(TicketPool ticketPool, int customerRetrievalRate, int customerId) {
        this.ticketPool = ticketPool;
        this.customerRetrievalRate = customerRetrievalRate;
        this.customerId = customerId;
        this.purchasedTickets = new ArrayList<Ticket>();
    }

    @Override
    public void run() {
        while (true) {
            try {
                Thread.sleep(customerRetrievalRate * 1000L);
                Ticket ticket = ticketPool.buyTicket(customerId);
                if (ticket != null) {
                    purchasedTickets.add(ticket);
                    System.out.println("Customer ID-" + customerId + " purchased a ticket: " + ticket);
                } else {
                    System.out.println("No more tickets available. Customer ID-" + customerId + " is exiting...");
                    break;
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
    public List<Ticket> getPurchasedTickets() {
        return purchasedTickets;
    }
}
