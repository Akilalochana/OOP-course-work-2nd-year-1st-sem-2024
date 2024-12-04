import java.math.BigDecimal;

public class Vendor implements Runnable{
    private final int vendorId;
    private final int ticketReleaseRate;
    private final TicketPool ticketPool;

    public Vendor(int vendorId, int ticketReleaseRate, TicketPool ticketPool) {
        this.vendorId = vendorId;
        this.ticketReleaseRate = ticketReleaseRate;
        this.ticketPool = ticketPool;
    }

    @Override
    public void run() {
        try {
            Thread.sleep(ticketReleaseRate * 1000L);
            Ticket ticket = new Ticket(vendorId, "Simple Event", new BigDecimal("1000"));
            ticketPool.addTicket(ticket, vendorId);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
