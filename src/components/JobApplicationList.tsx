import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { JobApplication } from '../types/JobApplication';
import JobApplicationForm from './JobApplicationForm';

const JobApplicationList: React.FC = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [editingApplication, setEditingApplication] = useState<JobApplication | null>(null);

  useEffect(() => {
    // Load applications from localStorage on component mount
    const savedApplications = localStorage.getItem('jobApplications');
    if (savedApplications) {
      setApplications(JSON.parse(savedApplications));
    }
  }, []);

  const saveApplications = (newApplications: JobApplication[]) => {
    setApplications(newApplications);
    localStorage.setItem('jobApplications', JSON.stringify(newApplications));
  };

  const handleAddApplication = (application: JobApplication) => {
    saveApplications([...applications, application]);
  };

  const handleUpdateApplication = (updatedApplication: JobApplication) => {
    const newApplications = applications.map((app) =>
      app.id === updatedApplication.id ? updatedApplication : app
    );
    saveApplications(newApplications);
    setEditingApplication(null);
  };

  const handleDeleteApplication = (id: string) => {
    const newApplications = applications.filter((app) => app.id !== id);
    saveApplications(newApplications);
  };

  const handleEditClick = (application: JobApplication) => {
    setEditingApplication(application);
  };

  return (
    <Box>
      {editingApplication ? (
        <JobApplicationForm
          initialData={editingApplication}
          onSubmit={handleUpdateApplication}
        />
      ) : (
        <JobApplicationForm onSubmit={handleAddApplication} />
      )}

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="job applications table">
            <TableHead>
              <TableRow>
                <TableCell>Company</TableCell>
                <TableCell>Job Title</TableCell>
                <TableCell>Application Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Job Link</TableCell>
                <TableCell>Notes</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>{application.companyName}</TableCell>
                  <TableCell>{application.jobTitle}</TableCell>
                  <TableCell>
                    {new Date(application.applicationDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{application.status}</TableCell>
                  <TableCell>
                    <a
                      href={application.jobLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Job
                    </a>
                  </TableCell>
                  <TableCell>{application.notes}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEditClick(application)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteApplication(application.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {applications.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography variant="body1" color="textSecondary">
                      No job applications yet. Add your first application above!
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default JobApplicationList; 