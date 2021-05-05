import './team.css';

const Advisors = () => {
    return(
        <div className="team-col">
        <div className="team-row">
            <div className="team-member">
            <div style={{width: "250px", height:" 260px", overflow: "hidden"}}><img src="/team-members/dz.jpg" width="250" alt="Image of Dan" className="profile-pic"></img></div>
            <div className="name-major">
                <p className="name">DAN ZEVIN</p>
                <p className="major">
                Conservation Track Advisor
                </p>
            </div>
            </div>
            <div className="team-member">
            <div style={{width: "250px", height:" 260px", overflow: "hidden"}}><img src="/team-members/ad.jpg" width="250" alt="Image of Aakash" className="profile-pic"></img></div>
            <div className="name-major">
                <p className="name">AAKASH DESAI MS</p>
                <p className="major">
                Conservation Track Advisor
                </p>
            </div>
            </div>
            <div className="team-member">
            <div style={{width: "250px", height:" 260px", overflow: "hidden"}}><img src="/team-members/dk.jpg" width="250" alt="Image of David" className="profile-pic"></img></div>
            <div className="name-major">
                <p className="name">DAVID KURTZ</p>
                <p className="major">
                Graduate Student Instructor, Conservation Track
                </p>
            </div>
            </div>
        </div>
        </div>
    )
}
export default Advisors;