import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FeaturedItems from "../products/FeaturedItems";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(5),
  },
  title: {
    padding: theme.spacing(3, 2.5, 2),
    color: theme.palette.openTitle,
  },
  media: {
    minHeight: 400,
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <>
      {/* <Link to="/">Home</Link> | <Link to="/users">Users</Link> |{" "}
      <Link to="/signup">Sign Up</Link> | <Link to="/signin">Sign In</Link> |
      <Link to="/">Sign Out</Link> */}
      <Card className={classes.card}>
        <CardContent>
          <FeaturedItems/>
        </CardContent>
      </Card>
    </>
  );
}