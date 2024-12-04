public class Customer implements Runnable{
    private final TicketPool ticketPool;
    private final int customerRetrievalRate;
    private final int customerId;

    public Customer(TicketPool ticketPool, int customerRetrievalRate, int customerId) {
        this.ticketPool = ticketPool;
        this.customerRetrievalRate = customerRetrievalRate;
        this.customerId = customerId;
    }

    @Override
    public void run() {
        while (true) {
            try {
                Thread.sleep(customerRetrievalRate * 1000L);
                Ticket ticket = ticketPool.buyTicket(customerId);
                if (ticket != null) {
                    System.out.println("Customer ID-" + customerId + " purchased a ticket.");
                    break;
                } else {
                    System.out.println("Customer ID-" + customerId + " is waiting for tickets.");
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
