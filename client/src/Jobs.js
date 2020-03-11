import React from "react";
import Typography from "@material-ui/core/Typography";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Job from "./Job";
import JobModal from './JobModal';

export default function Jobs({ jobs }) {
  // Pagination:
  const [activeStep, setActiveStep] = React.useState(0);
  const JOBS_PER_PAGE = 50;
  const totalJobs = jobs.length;
  const totalPages = Math.ceil(totalJobs/JOBS_PER_PAGE);
  // Get the job records that should appear on the current (activeStep #) page.
  const currentJobsOnPage = jobs.slice(activeStep * JOBS_PER_PAGE, activeStep * JOBS_PER_PAGE + JOBS_PER_PAGE);
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  // Modal:
  const [open, setOpen] = React.useState(false);
  const [selectedJob, setSelectedJob] = React.useState();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="App">
      <JobModal />
      <Typography variant="h3" component="h1">
        Entry Level Software Jobs for UoPeople Students
      </Typography>
      <Typography variant="h6" component="h2">
        Found {totalJobs} Jobs
      </Typography>
      {currentJobsOnPage.map((job, i) => (
        <Job key={i} job={job} id={i} onClick={setSelectedJob(job)} />
      ))}
      <div>
        Page {activeStep + 1} of {totalPages}
      </div>
      <MobileStepper
        variant="progress"
        steps={totalPages}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={totalPages === activeStep + 1}>
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </div>
  );
}
