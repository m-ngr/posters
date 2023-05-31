import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export interface IPost {
  name?: string;
  title: string;
  content: string;
  postedAt: Date;
  _id: string;
}

const Poster = ({
  expanded,
  handleChange,
  post,
}: {
  expanded: any;
  handleChange: any;
  post: IPost;
}) => {
  return (
    <Accordion
      expanded={expanded === post._id}
      onChange={handleChange(post._id)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Stack spacing={0}>
          <Typography sx={{ flexShrink: 0 }} variant="h6">
            {post.title}
          </Typography>

          <Typography sx={{ color: "text.secondary" }}>
            by {post.name ?? "Anonymous"} (
            {new Date(post.postedAt).toISOString().split("T")[0]})
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{post.content}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default Poster;
