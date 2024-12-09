class Configuration {
    int totalTickets;
    int numberOfVendors;
    int numberOfCustomers;
    int ticketReleaseRate;
    int customerRetrievalRate;
    int maxTicketCapacity;

    public Configuration(int totalTickets, int numberOfVendors, int numberOfCustomers, int ticketReleaseRate, int customerRetrievalRate, int maxTicketCapacity) {
        this.totalTickets = totalTickets;
        this.numberOfVendors = numberOfVendors;
        this.numberOfCustomers = numberOfCustomers;
        this.ticketReleaseRate = ticketReleaseRate;
        this.customerRetrievalRate = customerRetrievalRate;
        this.maxTicketCapacity = maxTicketCapacity;
    }
}
