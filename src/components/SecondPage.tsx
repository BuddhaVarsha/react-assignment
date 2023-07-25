import DepartmentData from './DepartmentData.js';
import PostsTable from "./PostsTable.js";

function SecondPage(){
    return(
        <>
        <div>
            <h2>data</h2>
            <PostsTable/>
            <DepartmentData/>
        </div>
        </>
    );
}

export default SecondPage;