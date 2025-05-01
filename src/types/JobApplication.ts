export interface JobApplication {
    id: string;
    companyName: string;
    jobTitle: string;
    applicationDate: Date;
    status: 'Applied' | 'Interview' | 'Offer' | 'Rejected';
    jobLink: string;
    notes: string;
} 