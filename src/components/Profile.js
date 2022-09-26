function Profile() {
    return (
      <div>
        <div>Nav-bar</div>
        <div className="profile">
          <div className="profile-content">
            <div className="profile-img">
              <img src="https://avatars.githubusercontent.com/u/85922192?v=4" className="profile-img"/>         
            </div>
            <div className="profile-title">
              <h2>gyueunnim</h2>
            </div>
            <div className="profile-univ">
              <h5>숭실대학교 소프트웨어학부</h5>
            </div>
            <div className="profile-intro">
              <p>
                안녕하세요 숭실대학교 소프트웨어학부 장규은입니다.<br/>
                현재 fool-stack 개발 목표로 공부하고 있습니다.
              </p>
              <div className="profile-msg">
                <button>쪽지</button>
              </div>
            </div>
          </div>
          <div className="profile-list">
            <p>작업 내용들~</p>
            {/* 서버 통신 후 내용 가져와서 띄우기~ */}
          </div>
        </div>
      </div>
    )
  }

  export default Profile;