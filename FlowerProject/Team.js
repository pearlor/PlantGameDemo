class Team {
	constructor(teamname){
		this.teamname = teamname;
		this.teampoints = 0;
	}
	updatePoints(points){
		this.teampoints += points;
		return this.teampoints;
	}
	getName(){
		return this.teamname;
	}
	getPoints(){
		return this.teampoints;
	}
	toString(){
		return 'Team ' + this.teamname + ' has ' + teampoints + ' points!';
	}
}