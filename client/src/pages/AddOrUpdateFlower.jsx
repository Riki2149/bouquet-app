import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import { httpAddFlower, httpUpdateFlower } from "../api/flowerServise";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Box, Paper, Grid, Alert, Snackbar } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import '../style/AddOrUpdateFlower.css';

const AddOrUpdateFlower = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const flowerToEdit = state?.flowerToEdit;

  const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
    defaultValues: flowerToEdit || { flowerContain: [""] } 
  });

  const { fields, append } = useFieldArray({
    control,
    name: "flowerContain"
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const save = async (data) => {
    try {
      const filteredFlowerContain = data.flowerContain.filter(item => item.trim() !== "");

      if (filteredFlowerContain.length === 0) {
        setSuccess(false);
        setMessage("Flower must contain at least one valid type!");
        setOpenSnackbar(true);
        return;
      }

      const updatedData = { ...data, flowerContain: filteredFlowerContain };

      if (flowerToEdit) {
        await httpUpdateFlower(flowerToEdit._id, updatedData);
        setSuccess(true);
        setMessage("Flower successfully updated!");
      } else {
        await httpAddFlower(updatedData);
        setSuccess(true);
        setMessage("Flower added successfully!");
        reset();
      }

      setOpenSnackbar(true);
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      console.log(err);
      setSuccess(false);
      setMessage(err.response?.data.message || "An error occurred");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (_, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <>
      <Box className="container">
        <Paper className="paper">
          <Typography variant="h4" component="h1" gutterBottom className="title">
            {flowerToEdit ? "Update Flower" : "Add New Flower"}
          </Typography>

          <form onSubmit={handleSubmit(save)}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField label="Flower Name" fullWidth {...register("name", { required: "Name is required" })} error={!!errors.name} helperText={errors.name?.message} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField label="Price" type="number" fullWidth {...register("price", { required: "Price is required", min: { value: 100, message: "Price must be at least 100" } })} error={!!errors.price} helperText={errors.price?.message} />
              </Grid>

              <Grid item xs={12}>
                <TextField label="Description" multiline rows={4} fullWidth {...register("description")} />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" className="subTitle">Flower Contents</Typography>
                {fields.length==0 &&
                  <Box className="flowerItem">
                    <TextField label={'Flower Item 0'} fullWidth {...register('flowerContain.0')} defaultValue={""} />
                  </Box>
                }
                {fields.map((item, index) => (
                  <Box key={item.id} className="flowerItem">
                    <TextField label={`Flower Item ${index + 1}`} fullWidth {...register(`flowerContain.${index}`)} defaultValue={item.value || ""} />
                  </Box>
                ))}
                <Button className="addButton" startIcon={<AddCircleIcon />} onClick={() => append("")}>Add Another Flower Type</Button>
              </Grid>

              <Grid item xs={12}>
                <TextField label="Image URL" fullWidth {...register("img")} />
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <Button className="saveButton" type="submit" variant="contained" fullWidth>
                  {flowerToEdit ? "Update Flower" : "Save Flower"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>

      <Snackbar open={openSnackbar} autoHideDuration={1500} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleCloseSnackbar} severity={success ? "success" : "error"} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddOrUpdateFlower;
