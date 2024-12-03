import java.sql.SQLOutput;
import java.util.LinkedList;
import java.util.Queue;

public class TicketPool {
    private int maximumTicketCapacity;
    private Queue<Ticket> ticketQueue;
    private Queue<Ticket> availableTickets;
    private int ticketSold;

    public TicketPool(int maximumTicketCapacity) {
        this.maximumTicketCapacity = maximumTicketCapacity;
        this.ticketQueue = new LinkedList<Ticket>();
        this.ticketSold = 0;
    }

    public synchronized void addTicket(Ticket ticket) {
        while (ticketQueue.size() > maximumTicketCapacity) {
            try{
                wait();

            }catch (InterruptedException e){
                e.printStackTrace();
                throw new RuntimeException(e.getMessage());
            }
        }

        this.ticketQueue.add(ticket);
        notify();
        System.out.println("Ticket added by" + Thread.currentThread().getName() + " - current size is -" + ticketQueue.size());
    }

    public synchronized Ticket buyTicket() {
        while (ticketQueue.isEmpty()) {
            try{
                wait();
            } catch (InterruptedException e){
                throw new RuntimeException(e.getMessage());
            }
        }
        Ticket ticket = ticketQueue.poll();
        ticketSold++;
        notify();
        System.out.println(;
    }
}
