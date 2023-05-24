import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Dashboard from '../../pages/dashboard/Dashboard';
import Kelas from '../../pages/kelas/Kelas';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ClassIcon from '@mui/icons-material/Class';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Divider } from '@mui/material';
import ListKelas from '../../pages/dashboard/ListKelas';
import { Link, useParams } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{width: '100%'}}
    >
      {value === index && (
        <Box sx={{ p: 3, bgcolor: '#eef2f6', height: '100%', borderTopLeftRadius: 15, marginX: 3, mt: 1, borderTopRightRadius: 15 }}>
          <Typography sx={{fontFamily: 'Inter; sans-serif'}}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const theme = createTheme({
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          alignItems: "start",
        },
      },
    },
  },
});

export default function SideBar() {
  const [value, setValue] = React.useState(0);
  let { name } = useParams()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '90vh' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 0, borderColor: 'divider', minWidth: '200px' }}
      >
        {/* <ThemeProvider theme={theme}> */}
          {/* <Divider variant='middle' /> */}
          <Tab icon={<DashboardIcon />} iconPosition='start' sx={{fontFamily: 'Inter; sans-serif', textTransform: "none", ml:0}} label="Dashboard" {...a11yProps(0)} />
          <Tab icon={<ClassIcon />} iconPosition='start' sx={{fontFamily: 'Inter; sans-serif', textTransform: "none", textAlign: 'start'}} label="Kelas" {...a11yProps(1)} />
          {ListKelas.map((kelas, index) => (
            <Link to={`/kelas/${kelas.name}`} >
              <Tab sx={{fontFamily: 'Inter; sans-serif', textTransform: "none"}} label={kelas.name} {...a11yProps(index)} />
            </Link>
          ))}
        {/* </ThemeProvider> */}
      </Tabs>
      <TabPanel value={value} index={0}>
        <Dashboard />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      {ListKelas.map((kelas, index) => (
        <TabPanel value={value} index={index+2}>
          <Kelas />
        </TabPanel>
      ))}
    </Box>
  );
}