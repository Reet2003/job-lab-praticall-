import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Paper,
  Typography,
  Grid,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { JobApplication } from '../types/JobApplication';

interface JobApplicationFormProps {
  onSubmit?: (application: JobApplication) => void;
  initialData?: JobApplication;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<Partial<JobApplication>>(
    initialData || {
      companyName: '',
      jobTitle: '',
      applicationDate: new Date(),
      status: 'Applied',
      jobLink: '',
      notes: '',
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newApplication: JobApplication = {
      id: initialData?.id || uuidv4(),
      companyName: formData.companyName || '',
      jobTitle: formData.jobTitle || '',
      applicationDate: formData.applicationDate || new Date(),
      status: formData.status || 'Applied',
      jobLink: formData.jobLink || '',
      notes: formData.notes || '',
    };
    onSubmit?.(newApplication);
    if (!initialData) {
      setFormData({
        companyName: '',
        jobTitle: '',
        applicationDate: new Date(),
        status: 'Applied',
        jobLink: '',
        notes: '',
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        {initialData ? 'Update Job Application' : 'New Job Application'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Job Title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Application Date"
              name="applicationDate"
              type="date"
              value={formData.applicationDate instanceof Date 
                ? formData.applicationDate.toISOString().split('T')[0]
                : new Date().toISOString().split('T')[0]}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              {['Applied', 'Interview', 'Offer', 'Rejected'].map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Job Link"
              name="jobLink"
              value={formData.jobLink}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              {initialData ? 'Update Application' : 'Add Application'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default JobApplicationForm; 