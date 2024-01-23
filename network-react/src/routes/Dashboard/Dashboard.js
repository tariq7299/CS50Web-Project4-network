import Posts from "../../Posts/Posts";
import TopNavBar from "../../TopNavBar/TopNavBar";
import "./Dashboard.scss"

function Dashboard() {

  return (
    
    
      // <div className="parent-container" >
      <>
        <div className="dashboard-container">
          <TopNavBar></TopNavBar>

          <Posts></Posts>
        </div>
      </>


    
  );
}

export default Dashboard;
