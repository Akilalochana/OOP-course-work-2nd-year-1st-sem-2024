import java.math.BigDecimal;

class Vendor implements Runnable {
    private final int vendorId;
    private final int ticketReleaseRate;
    private final TicketPool ticketPool;
    private final int totalTickets;
    private static int ticketIdCounter = 0;

    public Vendor(int vendorId, int ticketReleaseRate, TicketPool ticketPool, int totalTickets) {
        this.vendorId = vendorId;
        this.ticketReleaseRate = ticketReleaseRate;
        this.ticketPool = ticketPool;
        this.totalTickets = totalTickets;
    }

    @Override
    public void run() {
        while (Main.running.get()) {
            try {
                Thread.sleep(ticketReleaseRate * 1000L);
                synchronized (Vendor.class) {
                    if (ticketIdCounter >= totalTickets) {
                        break;
                    }
                    Ticket ticket = new Ticket(++ticketIdCounter, "Event 1", new BigDecimal("1500"));
                    ticketPool.addTicket(ticket, vendorId);
                }
            } catch (InterruptedException e) {
                // Thread was interrupted, exit the loop
                break;
            }
        }
    }
}