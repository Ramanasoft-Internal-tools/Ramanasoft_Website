import React, { useMemo,useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { Card, Button, Container, Row, Col,Table} from 'react-bootstrap';

import { IoPersonAddSharp } from "react-icons/io5";
import { FaChevronCircleRight, FaCheck, FaTimes, FaUserTie,FaSearch,FaFilePdf} from "react-icons/fa";
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';

import axios from 'axios';

const HrPortal = () => {
  const location = useLocation();
  const [statistics, setStatistics] = useState([
    { title: 'Total Students Applied', value: 0, link: '/sa_dash/students-applied', color: '#37a6b8', element: IoPersonAddSharp },
    { title: 'Total Students Qualified', value: 0, link: '/sa_dash/students-qualified', color: '#e8c93f', element: FaCheck },
    { title: 'Total Students Placed', value: 0, link: '/sa_dash/students-placed', color: '#21bf40', element: FaUserTie },
    { title: 'Total Students Not Placed', value: 0, link: '/sa_dash/students-not-placed', color: '#f73643', element: FaTimes },
    { title: 'Total Students Not Attended', value: 0, link: '/sa_dash/not-attended', color: '#838485', element: IoPersonAddSharp },
    { title: 'Yet to Receive Feedback', value: 0, link: '/sa_dash/under-progress', color: '#40e0d0', element: IoPersonAddSharp },
    
    { title: 'Eligible/ Profile Sent', value: 0, link: '/sa_dash/eligible', color: '#49494a', element: FaCheck },
    { title: 'Not Eligible', value: 0, link: '/sa_dash/not-eligible', color: '#fa8072', element: FaTimes },
    
    ,
    { title: 'Total Students at Level 1', value: 0, link: '/sa_dash/level-1', color: '#ff6347', element: FaCheck },
    { title: 'Total Students at Level 2', value: 0, link: '/sa_dash/level-2', color: '#4682b4', element: FaUserTie },
    { title: 'Total Students at Level 3', value: 0, link: '/sa_dash/level-3', color: '#008080', element: FaCheck },
    { title: 'Total Students Not Interested', value: 0, link: '/sa_dash/not-interested', color: '#da70d6', element: FaTimes }
  ]);

  const [hrStatistics, setHrStatistics] = useState([
    { title: 'Hr Leads', value: 0, link: '/sa_dash/hr-leads', color: '#37a6b8', element: IoPersonAddSharp },
    { title: 'JD received', value: 0, link: '/sa_dash/jd-received', color: '#e8c93f', element: FaCheck },
    { title: 'Profiles  Sent', value: 0, link: '/sa_dash/companies/profiles-sent', color: '#21bf40', element: FaUserTie },
    { title: 'Drive Scheduled', value: 0, link: '/sa_dash/companies/drive-scheduled', color: '#f73643', element: FaTimes },
    
    { title: 'Drive Done/Offer received', value: 0, link: '/sa_dash/companies/drive-done', color: '#9acd32', element: FaCheck },
    {title:'Not interested HRs',value:0,link:'/sa_dash/companies/not-interested',color:'#708090',element:FaUserTie}
    
  ]);
  const tabs=[{id:'studentsPanel',text:'Students panel'},{id:'HRsPanel',text:'HR panel'},{id:'applicantsHistory',text:'Applicants History'}]
  const [activeTab,setActiveTab]=useState(tabs[0].id)
  const [data, setData] = useState([]);
  const[searchTerm,setSearchTerm]=useState('')
  const [candidate,setCandidateData]=useState({})
  const navigate = useNavigate();
  const [errorMsg,setErrMsg]=useState(false)
  const [dropdownValue, setDropdownValue] = useState('selectCriteria');

    const handleSelect = (e) => {
        setDropdownValue(e);
    };

    

  useEffect(() => {

    fetchData();
  }, [candidate]);

  useEffect(()=>{
    const active=sessionStorage.getItem('activeTab')
    if(!active){
      setActiveTab(tabs[0].id)
    }
    else{
      setActiveTab(active)
    }
    console.log("Active tab",active)
  })

  const fetchData = async () => {
    console.log("Applied")
    try {
      const response = await axios.get(`http://localhost:5000/applicant-history/${candidate.candidateID}`);
      console.log("Applicant data",response.data) // Adjust the URL as needed
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const fetchStatistics = async () => {
      try {/*
        const [
          { data: applied },
          { data: qualified },
          { data: placed },
          { data: notPlaced },
          { data: notAttended },
          { data: confirmedLeads },
          { data: recruiters },
          { data: notInterestedHrs }
        ] = await Promise.all([
          axios.get(`http://localhost:5000/hr-statistics/?status=applied&hrId=${HrId}`),
          axios.get('http://localhost:5000/hr-statistics/qualified'),
          axios.get('http://localhost:5000/hr-statistics/placed'),
          axios.get('http://localhost:5000/hr-statistics/not-placed'),
          axios.get('http://localhost:5000/hr-statistics/not-attended'),
          axios.get('http://localhost:5000/hr-statistics/not-interested'),
          axios.get('http://localhost:5000/hr-statistics/not-eligible'),
          axios.get('http://localhost:5000/hr-statistics/eligible')
        ]);*/
        console.log("Doing apis")
        const appliedResponse = await axios.get(`http://localhost:5000/statistics/applied`);
const qualifiedResponse = await axios.get(`http://localhost:5000/statistics/qualified`);
const placedResponse = await axios.get(`http://localhost:5000/statistics/placed`);
const notPlacedResponse = await axios.get(`http://localhost:5000/statistics/not-placed`);
const notAttendedResponse = await axios.get(`http://localhost:5000/statistics/not-attended`);
const confirmedLeadsResponse = await axios.get(`http://localhost:5000/statistics/not-interested`);
const recruitersResponse = await axios.get(`http://localhost:5000/statistics/not-eligible`);
const notInterestedHrsResponse = await axios.get(`http://localhost:5000/statistics/eligible`);
const underProgressResponse = await axios.get(`http://localhost:5000/statistics/under-progress`);
const level1Response = await axios.get(`http://localhost:5000/statistics/level-1`);
const level2Response = await axios.get(`http://localhost:5000/statistics/level-2`);
const level3Response = await axios.get(`http://localhost:5000/statistics/level-3`); 
        console.log("Done apis")
        console.log("Applied data",qualifiedResponse.data.count)
       
        setStatistics(prevStats => prevStats.map(stat => {
          
          switch (stat.title) {
            case 'Total Students Applied':
              return { ...stat, value: appliedResponse.data.count };
            case 'Total Students Qualified':
              return { ...stat, value: qualifiedResponse.data.count };
            case 'Total Students Placed':
              return { ...stat, value: placedResponse.data.count };
            case 'Total Students Not Placed':
              return { ...stat, value: notPlacedResponse.data.count };
            case 'Total Students Not Attended':
              return { ...stat, value: notAttendedResponse.data.count };
            case 'Total Students Not Interested':
              return { ...stat, value: confirmedLeadsResponse.data.count };
            case 'Not Eligible':
              return { ...stat, value: recruitersResponse.data.count };
            case 'Eligible/ Profile Sent':
              return { ...stat, value: notInterestedHrsResponse.data.count };
              case 'Yet to Receive Feedback':
                return { ...stat, value: underProgressResponse.data.count };
              case 'Total Students at Level 1':
                return { ...stat, value: level1Response.data.count };
              case 'Total Students at Level 2':
                return { ...stat, value: level2Response.data.count };
              case 'Total Students at Level 3':
                return { ...stat, value: level3Response.data.count };  
            default:
              return stat;
          }
        }));
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };
    const jobStatistics = async () => {
      try {
        const HrLeadsResponse = await axios.get(`http://localhost:5000/job-statistics/hr-leads`);
const JdReceivedResponse = await axios.get(`http://localhost:5000/job-statistics/jd-received`);
const profilesSentResponse = await axios.get(`http://localhost:5000/job-statistics/profile-sent`);
const driveScheduledResponse = await axios.get(`http://localhost:5000/job-statistics/drive-scheduled`);
const driveDoneResponse = await axios.get(`http://localhost:5000/job-statistics/drive-done`);
const notInterestedResponse = await axios.get(`http://localhost:5000/job-statistics/not-interested`);

    
        setHrStatistics(prevStats =>
          prevStats.map(stat => {
            switch (stat.title) {
              case 'Hr Leads':
                return { ...stat, value: HrLeadsResponse.data.count };
              case 'JD received':
                return { ...stat, value: JdReceivedResponse.data.count };
              case 'Profiles Sent':
                return { ...stat, value: profilesSentResponse.data.count };
              case 'Drive Scheduled':
                return { ...stat, value: driveScheduledResponse.data.count };
              case 'Drive Done/Offer received':
                return { ...stat, value: driveDoneResponse.data.count };
              case 'Not interested HRs':
                return { ...stat, value: notInterestedResponse.data.count };
              default:
                return stat;
            }
          })
        );
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };
    

    fetchStatistics();
    jobStatistics();
  }, [navigate]);

/*
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const [
          { data: applied },
          { data: qualified },
          { data: placed },
          { data: notPlaced },
          { data: notAttended },
          { data: confirmedLeads },
          { data: recruiters },
          { data: notInterestedHrs }
        ] = await Promise.all([
          axios.get('http://localhost:5000/statistics/applied'),
          axios.get('http://localhost:5000/statistics/qualified'),
          axios.get('http://localhost:5000/statistics/placed'),
          axios.get('http://localhost:5000/statistics/not-placed'),
          axios.get('http://localhost:5000/statistics/not-attended'),
          axios.get('http://localhost:5000/statistics/not-interested'),
          axios.get('http://localhost:5000/statistics/not-eligible'),
          axios.get('http://localhost:5000/statistics/eligible')
        ]);

        setStatistics(prevStats => prevStats.map(stat => {
          switch (stat.title) {
            case 'Total Students Applied':
              return { ...stat, value: applied.count };
            case 'Total Students Qualified':
              return { ...stat, value: qualified.count };
            case 'Total Students Placed':
              return { ...stat, value: placed.count };
            case 'Total Students Not Placed':
              return { ...stat, value: notPlaced.count };
            case 'Total Students Not Attended':
              return { ...stat, value: notAttended.count };
            case 'Total Students Not Interested':
              return { ...stat, value: confirmedLeads.count };
            case 'Not Eligible':
              return { ...stat, value: recruiters.count };
            case 'Eligible/ Profile Sent':
              return { ...stat, value: notInterestedHrs.count };
            default:
              return stat;
          }
        }));
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };
    const jobStatistics = async () => {
      try {
        const [
          { data: HrLeads },
          { data: JdReceived },
          { data: profilesSent },
          { data: driveScheduled },
          { data: driveDone },
          { data: notInterested },
        ] = await Promise.all([
          axios.get('http://localhost:5000/job-statistics/hr-leads'),
          axios.get('http://localhost:5000/job-statistics/jd-received'),
          axios.get('http://localhost:5000/job-statistics/profiles-sent'),
          axios.get('http://localhost:5000/job-statistics/drive-scheduled'),
          axios.get('http://localhost:5000/job-statistics/drive-done'),
          axios.get('http://localhost:5000/job-statistics/not-interested'),
        ]);
    
        setHrStatistics(prevStats =>
          prevStats.map(stat => {
            switch (stat.title) {
              case 'Hr Leads':
                return { ...stat, value: HrLeads.count };
              case 'JD received':
                return { ...stat, value: JdReceived.count };
              case 'Profiles Sent':
                return { ...stat, value: profilesSent.count };
              case 'Drive Scheduled':
                return { ...stat, value: driveScheduled.count };
              case 'Drive Done/Offer received':
                return { ...stat, value: driveDone.count };
              case 'Not interested HRs':
                return { ...stat, value: notInterested.count };
              default:
                return stat;
            }
          })
        );
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };
    

    fetchStatistics();
    jobStatistics();
  }, [navigate]);*/
  const activeTabToggle=(id)=>{
    console.log(activeTab===id)
    sessionStorage.setItem("activeTab",id)
    setActiveTab(id)
  }
  const memoColumns = useMemo(() => [
    
    { Header: 'Full Name', accessor: 'fullName' },
    { Header: 'Contact Number', accessor: 'mobileNo' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Job Role', accessor: 'jobRole' },
    { Header: 'Company Name', accessor: 'companyName' },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ value }) => {
        let color;
        switch (value) {
          case 'In progress':
            color = 'yellow';
            break;
          case 'Qualified':
            color = 'green';
            break;
          case 'Not Qualified':
            color = 'red';
            break;
          default:
            color = 'blue';
        }
        return <span style={{ color ,fontWeight:'600'}}>{value}</span>;
      }
    },
    { Header: 'Y.O.P', accessor: 'passedOut' },
    { Header: 'Gender', accessor: 'gender' },
    { Header: 'Experience', accessor: 'experience' },
    { Header: 'Resume', accessor: 'resume', disableSortBy: true }
  ], [data]);

  const memoData = useMemo(() => data, [data]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setGlobalFilter,
    state,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize
  } = useTable(
    { columns: memoColumns, data: memoData, initialState: { pageSize: 10 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const handleMoreInfo = (link) => {
    navigate(link);
  };

  const switchRenderTabs=()=>{
    switch(activeTab){
      case 'studentsPanel':
        return renderStudentsPanel()
      case 'HRsPanel':
        return renderHRPanel()
      case 'applicantsHistory':
        return renderApplicantHistory()    
      default:
    }
  }

  const handleResumeDownload = async (applicationId) => {
    try {
      console.log("Id:", applicationId);
      // Send request to backend with applicationId
      const response = await axios({
        url: `http://localhost:5000/download-resume/${applicationId.applicationID}`,
        method: 'GET',
        responseType: 'blob', // Important for handling binary data
      });

      // Create a blob URL from the response
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      
      // Create a link element
      const link = document.createElement('a');
      link.href = url;
      link.download = `resume-${applicationId.fullName}.pdf`; // Set a default file name
      document.body.appendChild(link);
      link.click(); // Trigger the download
      link.remove(); // Clean up
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  const onClickSearch=async()=>{
    if(searchTerm!==''){
      const  searchQuery=`${dropdownValue}=${searchTerm}`
       const response=await axios.get(`http://localhost:5000/applicant-history/?${searchQuery}`)
       console.log("Response:",response)
       if (Object.keys(response.data).length!==0){
        setCandidateData(response.data)
        setErrMsg(false)
       fetchData()
       }
       else{
        setErrMsg(true);
        setCandidateData({})
        setData([])
       }
       
    }
  }

  const renderApplicantHistory=()=>{

    return(
      <Row className='d-flex flex-column align-items-center' >
        <Col lg={2} sm={6} xs={6}>
        <h3>Applicants Search</h3>
        </Col>
        <Col lg={8} sm={12} xs={12} style={{ backgroundColor: '#ffffff', padding: '0', borderRadius: '5px', display: 'flex', flexDirection: 'row',height:'40px' }}>
        <select
        style={{width:'30%',height:'40px',borderRadius:'5px 0px 0px 5px',border:'none',outline:'none'}}
          value={dropdownValue}
          onChange={(e) => setDropdownValue(e.target.value)}
        >
          <option value="selectCriteria">Select criteria</option>
          <option value="candidateID">Candidate ID</option>
          <option value="fullName">Full Name</option>
          <option value="email">Email</option>
          <option value="mobileNumber">Phone</option>
          
              
             
        </select>
            <input
                style={{ border: 'none', backgroundColor: '#ffffff', width: '60%', borderRadius: '0', marginRight: '0px',height:'40px',outline:'none' }}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="search"
            />
            <Button
                onClick={onClickSearch}
                style={{ border:'none',backgroundColor: 'transparent', padding: '0', marginLeft: '0px',marginRight:'0px', width: '10%',textAlign:'right' }}
            >
                <FaSearch bold style={{ margin: '0', marginBottom: '5px', color: "#ffffff", width: '100%',color:'blue' }} />
            </Button>
        </Col>
        {Object.keys(candidate).length>0 &&(<Col lg={10} sm={12} xs={12} className='mt-4'>
        <Table responsive bordered className="table" >
            <thead style={{backgroundColor:'green'}}>
              <tr style={{backgroundColor:'blue'}}>
              <th style={{backgroundColor:'#1b74a8',color:'white'}}>CandidateID</th>
                <th style={{backgroundColor:'#1b74a8',color:'white'}}>Name</th>
                <th style={{backgroundColor:'#1b74a8',color:'white'}}>Email</th>
                <th style={{backgroundColor:'#1b74a8',color:'white'}}>Phone</th>
                <th style={{backgroundColor:'#1b74a8',color:'white'}}>Domain</th>
                <th style={{backgroundColor:'#1b74a8',color:'white'}}>Batch</th>
                
              </tr>
            </thead>
            <tbody>
              
                <tr key={candidate.candidateID}>
                  <td>{candidate.candidateID}</td>
                  <td>{candidate.fullName}</td>
                  <td>{candidate.email}</td>
                  <td>{candidate.mobileNo}</td>
                  <td>{candidate.domain}</td>
                  <td>{candidate.batchNo}</td>
                  
                </tr>
             
            </tbody>
            
          </Table>
          </Col>
          )}
          {errorMsg&&(<Col lg={10} sm={12} xs={12}><p style={{width:'100%',textAlign:'center',marginTop:'10px'}}>No data Found</p></Col>)}
        
        
        
        
        
        {data.length>0&&(<Col Col lg={10} sm={12} xs={12} className='mt-4' >
        <table responseive bordered {...getTableProps()} style={{ borderCollapse: 'collapse',width:'100%' }}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{ backgroundColor: '#416cb0', color: '#ffffff', border: '1px solid black', padding: '8px' }}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' ðŸ”½'
                          : ' ðŸ”¼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          
          <tbody {...getTableBodyProps()}>
              {page.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td
                      {...cell.getCellProps()}
                      style={{ border: '1px solid black', padding: '8px', cursor: cell.column.id === 'resume' ? 'pointer' : 'default',backgroundColor:'#ffffff'}}
                      onClick={() => {
                        if (cell.column.id === 'resume') {
                          const applicationId = row.original;
                          handleResumeDownload(applicationId);
                        }
                      }}
                    >
                      {cell.column.id === 'resume' ? (
                        <div className='text-align-center d-flex flex-row justify-content-center'>
                          <FaFilePdf color='#2a97eb' />
                        </div>
                      ) : (
                        cell.render('Cell')
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        
        

        </table>
        </Col>)}
        {(Object.keys(candidate).length>0 && data.length==0)&&(<Col lg={10} sm={12} xs={12}><p style={{width:'100%',textAlign:'center',marginTop:'10px'}}>No jobs applied</p></Col>)}
        
      </Row>
    )
  }

  const renderStudentsPanel=()=>{
    return(
<Container className="my-4" style={{ display: 'flex', overflow: 'hidden', width:'1160px'}}>
<Row>
      {statistics.map((stat, index) => (
        <Col key={index} md={6} lg={3} className="mb-4 pb-0" style={{ borderRadius: '10px' }}>
          <Card className="pb-0 mb-0" style={{ backgroundColor: `${stat.color}`, border: 'none', borderRadius: '5px' }}>
            <div className='d-flex flex-row justify-content-between mt-2 mb-3 '>
              <div>
                <Card.Title style={{ fontSize: '30px', color: '#ffffff', fontWeight: 'bold', marginLeft: '10px' }}>{stat.value}</Card.Title>
                <Card.Text style={{ color: '#ffffff', marginLeft: '10px' }}>
                  {stat.title}
                </Card.Text>
              </div>
              {React.createElement(stat.element, {
                key: index,
                style: { alignSelf: 'center', color: '#000000', opacity: '0.2', marginRight: '15px' },
                size: 40
              })}
            </div>
            <Button className='mb-0 w-100 ' style={{ backgroundColor: '#000000', border: "none", borderRadius: '0px 0px 5px 5px', opacity: '0.3' }} onClick={() => handleMoreInfo(stat.link)}>More Info <FaChevronCircleRight className='mb-1' size={20} /></Button>
          </Card>
        </Col>
      ))}
    </Row>
    </Container>
    )
  }

  const renderHRPanel=()=>{
    

    return(
<Container className="my-4" style={{ display: 'flex', overflow: 'hidden', width:'1160px'}}>
<Row>
          {hrStatistics.map((stat, index) => (
            <Col key={index} md={6} lg={3} className="mb-4 pb-0" style={{ borderRadius: '10px' }}>
              <Card className="pb-0 mb-0" style={{ backgroundColor: `${stat.color}`, border: 'none', borderRadius: '5px' }}>
                <div className='d-flex flex-row justify-content-between mt-2 mb-3 '>
                  <div>
                    <Card.Title style={{ fontSize: '30px', color: '#ffffff', fontWeight: 'bold', marginLeft: '10px' }}>{stat.value}</Card.Title>
                    <Card.Text style={{ color: '#ffffff', marginLeft: '10px' }}>
                      {stat.title}
                    </Card.Text>
                  </div>
                  {React.createElement(stat.element, {
                    key: index,
                    style: { alignSelf: 'center', color: '#000000', opacity: '0.2', marginRight: '15px' },
                    size: 40
                  })}
                </div>
                <Button className='mb-0 w-100 ' style={{ backgroundColor: '#000000', border: "none", borderRadius: '0px 0px 5px 5px', opacity: '0.3' }} onClick={() => handleMoreInfo(stat.link)}>More Info <FaChevronCircleRight className='mb-1' size={20} /></Button>
              </Card>
            </Col>
          ))}
        </Row>
        </Container>
    )
  }
console.log(hrStatistics)
  return (
    <div style={{ backgroundColor: '#e9ebf0', zIndex: 2, height: '100vh' }}>
      {/* <HrNavbar /> */}
      <Container fluid className="my-4">
        
        <Row style={{marginBottom:'10px',boxShadow:' 0 2px 2px #00378a'}}>
          {tabs.map(tab=>(
            <Col  xs={3}
            sm={2}
            md={2}
            lg={2} style={{borderBottom:activeTab===tab.id?'3px solid #905df5':'',borderRadius:'8px 8px 0px 0px'}} ><button id={tab.id} className='tab-btns' style={{background:'transparent',color:activeTab === tab.id ? '#905df5' : '#2c2f33',border:'none',fontWeight:activeTab===tab.id?'600':'normal',marginBottom:'10px'}} onClick={()=>activeTabToggle(tab.id)}>{tab.text}</button></Col>
          ))}
          
          {/*<Col  sm={1} lg={3} style={{backgroundColor:'transparent'}}><button className='tab-btns' style={{background:'transparent'}}>HRs panel</button></Col>
          <Col  sm={1} lg={3} style={{backgroundColor:'transparent'}}><button className='tab-btns' style={{background:'transparent'}}>Applicants History</button></Col>*/}
        </Row>
        {switchRenderTabs()}
        
      </Container>
    </div>
  );
};

export default HrPortal;