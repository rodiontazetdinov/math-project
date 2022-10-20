export function handleTime (startTime) {
    const endTime = performance.now();
    // setTimeout(()=> {
    // const times = performance.now();
    // console.log(times);
    // const valera = times - time;
    return Math.round((endTime - startTime) / 1000 / 60);
    // console.log(valera / 1000 / 60);
    // }, 60000)
    
}