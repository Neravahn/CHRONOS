export function drawDigitalClock( ctx, x, y, width, height, msElapsed, label) {
    function timeformat(ms) {

        //SETTING UP THE CLOCK TIME FORMAT
        let totalseconds = Math.floor(ms / 1000);
        let miliseconds = (ms % 1000).toString().padStart(3, '0');
        let hours = Math.floor(totalseconds / 3600).toString().padStart(2, '0');
        let minutes = Math.floor((totalseconds % 3600) / 60).toString().padStart(2, '0');
        let seconds = (totalseconds % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}:${miliseconds}`;
    }


}