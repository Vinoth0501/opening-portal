"use client";
import React, { useState, useEffect } from "react";
import axios from "@/lib/axios";
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
  Alert,
  Box,
  InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Edit, Delete } from "@mui/icons-material";
import CustomPagination from "../components/CustomPagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import PopoverComponent from "../components/Popover";
import CircularProgress from "@mui/material/CircularProgress";
import CommonModal from "../components/CommonModal";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
  });
  const [editJobId, setEditJobId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 6;
  const token = localStorage.getItem("token");
  const [selectedJob, setSelectedJob] = useState(null);
  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [searchJobs, setSearchJobs] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [timeInterval, setTimeInterval] = useState(null);
  const keyResponsibility = [
    {
      id: 1,
      text: "Develop and maintain high-performance web applications using React.js.",
    },
    {
      id: 2,
      text: "Implement and manage state using Redux, react-query, or other state management libraries.",
    },
    {
      id: 3,
      text: "Optimize applications for speed and scalability using techniques like lazy loading, memoization, and code splitting.",
    },
    {
      id: 4,
      text: "Ensure application quality by writing unit, integration, and end-to-end tests using tools like Jest and Cucumber.",
    },
    {
      id: 5,
      text: "Integrate with RESTful APIs and implement authentication mechanisms like OAuth and JWT.",
    },
    {
      id: 6,
      text: "Work with Git, GitHub/GitLab/Bitbucket for version control and pull request workflows.",
    },
    {
      id: 7,
      text: "Follow Agile/Scrum methodologies to deliver high-quality products on time.",
    },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(data);
      setLoading(false);
      setTimeout(() => {
        setSuccessAlert(false);
      }, 3000);
    } catch (error) {
      console.error("Error fetching jobs", error);
      setLoading(false);
    }
  };
  const capitalizeKeys = (obj) => {
    return Object.keys(obj).reduce((acc, key) => {
      const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
      acc[capitalizedKey] = obj[key];
      return acc;
    }, {});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !formData.company.trim() ||
        !formData.description.trim() ||
        !formData.location.trim() ||
        Number(formData.salary) <= 0 ||
        !formData.title.trim()
      ) {
        setShowAlert(true);
        return;
      }

      setShowAlert(false);

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      if (editJobId) {
        await axios.put(`/api/jobs/${editJobId}`, formData, config);
      } else {
        await axios.post("/api/jobs/", formData, config);
      }

      setSuccessAlert(true);
      await fetchJobs();

      setFormData({
        title: "",
        description: "",
        company: "",
        location: "",
        salary: "",
      });
      setEditJobId(null);
    } catch (error) {
      console.error("Error submitting job:", error);
      setSuccessAlert(false);
    }
  };

  const handleEdit = () => {
    if (!selectedJob) return;
    setFormData(selectedJob);
    setEditJobId(selectedJob._id);
    handleClose();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchJobs();
      setAnchorEl(null);
    } catch (error) {
      console.error("Error deleting job", error);
      setAnchorEl(null);
    }
  };

  const itemsToDisplay = filteredJobs?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event, job) => {
    setAnchorEl(event.currentTarget);
    setSelectedJob(job);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedJob(null);
  };
  const [detailsData, setDetailsData] = useState(null);
  const handleViewDetails = async (id) => {
    try {
      const { data } = await axios.get(`/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDetailsData(data);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching job details:", error);
      return null;
    }
  };
  useEffect(() => {
    if (timeInterval) {
      clearTimeout(timeInterval);
    }
    if (searchJobs.trim() === "") {
      setFilteredJobs(jobs);
      return;
    }
    const newTimeout = setTimeout(() => {
      setFilteredJobs(
        jobs.filter((item) =>
          item.title.toLowerCase().includes(searchJobs.toLowerCase())
        )
      );
    }, 500);
    setTimeInterval(newTimeout);
    return () => clearTimeout(newTimeout);
  }, [searchJobs, jobs]);

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {[...Array(4)].map((_, index) => (
      <div key={index} className="p-4 border rounded shadow animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
    ))}
  </div>;

  return (
    <Grid>
      {showAlert ? (
        <Alert severity="error" onClose={() => setShowAlert(false)}>
          {`${Object.keys(capitalizeKeys(formData)).join(
            ", "
          )}: Fill all the inputs to proceed`}
        </Alert>
      ) : (
        successAlert && (
          <Alert severity="success" onClose={() => setShowAlert(false)}>
            {`Data added successfully`}
          </Alert>
        )
      )}
      <Typography variant="h4" sx={{ pb: 1 }}>
        Job Portal
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <TextField
            name="title"
            label="Title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12} lg={6}>
          <TextField
            name="company"
            label="Company"
            value={formData.company}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            name="location"
            label="Location"
            value={formData.location}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12} lg={6}>
          <TextField
            name="salary"
            label="Salary"
            value={formData.salary}
            onChange={handleChange}
            fullWidth
            required
            type="number"
          />
        </Grid>

        <Grid
          item
          xs={12}
          lg={6}
          style={{ display: "flex", justifyContent: "end" }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#12266a",
              borderRadius: "10px",
              width: "100%",
              height: "50px",
              "&:hover": {
                backgroundColor: "#12264a",
              },
            }}
          >
            {editJobId ? "Update Job" : "Create Job"}
          </Button>
        </Grid>
      </Grid>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pt: 4, pb: 7 }}
      >
        <Typography sx={{ fontWeight: "bold" }} variant="h6">
          Job Openings
        </Typography>

        <Box
          display="flex"
          alignItems="center"
          sx={{ border: 1, borderRadius: 2, px: 1, py: 0.5 }}
        >
          <InputBase
            placeholder="Search jobs title..."
            onChange={(e) => setSearchJobs(e.target.value)}
            sx={{ flex: 2 }}
          />
          <SearchIcon sx={{ color: "#12264a" }} />
        </Box>
      </Box>

      <Grid container spacing={3}>
        {loading ? (
          <div
            style={{
              height: "220px",
              width: "100%",
              display: "grid",
              placeContent: "center",
            }}
          >
            <CircularProgress size={30} />
          </div>
        ) : (
          <Grid container spacing={2}>
            {itemsToDisplay && itemsToDisplay.length > 0 ? (
              itemsToDisplay.map((job) => (
                <Grid item xs={12} sm={6} md={4} key={job._id}>
                  <Card
                    sx={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                    }}
                  >
                    <CardContent>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="h6">{job.title}</Typography>
                        <IconButton
                          aria-label="Example"
                          onClick={(e) => handleClick(e, job)}
                        >
                          <FontAwesomeIcon
                            icon={faEllipsisV}
                            style={{ fontSize: "18px" }}
                          />
                        </IconButton>
                        <PopoverComponent
                          key={job._id}
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          handleClose={handleClose}
                        >
                          <Typography
                            onClick={handleEdit}
                            sx={{
                              px: 3,
                              pt: 2,
                              pb: 1,
                              cursor: "pointer",
                              "&:hover": { backgroundColor: "#f5f5f8" },
                            }}
                          >
                            Edit
                          </Typography>
                          <Typography
                            onClick={() => handleDelete(selectedJob?._id)}
                            sx={{
                              px: 3,
                              pb: 2,
                              cursor: "pointer",
                              "&:hover": { backgroundColor: "#f5f5f8" },
                            }}
                          >
                            Delete
                          </Typography>
                        </PopoverComponent>
                      </div>

                      <Typography>{job.description}</Typography>
                      <Typography>
                        {job.company} - {job.location}
                      </Typography>
                      <Typography>Salary: {job.salary}</Typography>
                      <div style={{ display: "flex", justifyContent: "end" }}>
                        <Button
                          type="submit"
                          variant="outlined"
                          onClick={() => handleViewDetails(job._id)}
                          size="small"
                          sx={{
                            outline: "#12266a",
                            border: "2px solid #12266a",
                            color: "#12266a",
                            "&:hover": { backgroundColor: "#f5f5f5" },
                          }}
                        >
                          View Detail
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "220px",
                }}
              >
                <Typography variant="h6" color="textSecondary">
                  No data found
                </Typography>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          paddingBottom: "40px",
        }}
      >
        {filteredJobs?.length > itemsPerPage && (
          <CustomPagination
            totalItems={filteredJobs?.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      <CommonModal
        open={open}
        handleClose={() => setOpen(false)}
        title="Job description"
      >
        {detailsData ? (
          <>
            <Typography variant="body2">{detailsData.description}</Typography>
            <Typography variant="body2">
              Salary: {detailsData.salary}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", mb: 2, color: "#1a237e" }}
            >
              {detailsData.title}
            </Typography>

            {/* Location & Experience */}
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "#333" }}
            >
              Location:{" "}
              <span style={{ fontWeight: "normal" }}>
                {detailsData.location}
              </span>
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "#333", mb: 2 }}
            >
              Experience Range:{" "}
              <span style={{ fontWeight: "normal" }}>2 - 3 years</span>
            </Typography>

            <Typography variant="body2" sx={{ fontWeight: "bold", mt: 2 }}>
              Position Overview
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#555", mb: 2, fontWeight: "semi-bold" }}
            >
              We are looking for a highly skilled and experienced Senior ReactJS
              Developer to join our development team. As a Senior React
              Developer , you will be responsible for building and maintaining
              advanced web applications , managing state effectively, and
              ensuring high performance across various devices.
            </Typography>

            <Typography variant="body2" sx={{ fontWeight: "bold", mt: 2 }}>
              Key Responsibilities
            </Typography>
            <ul style={{ paddingLeft: "20px" }}>
              {keyResponsibility.map((item, index) => (
                <li key={item["id"]}>
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    {item["text"]}
                  </Typography>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </CommonModal>
    </Grid>
  );
};

export default JobsPage;
