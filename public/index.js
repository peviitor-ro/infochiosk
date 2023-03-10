import job from "./jobs.json" assert { type: "json" };

let jobs = job.response.docs;

setInterval(() => {
  changeUrl(jobs);
}, 3000);


function changeUrl(jobs) {
  const jobLink = jobs[Math.floor(Math.random() * jobs.length)].job_link;

  console.log(jobLink);

  setTimeout(() => {
    window.location.href = jobLink;

    changeUrl(jobs);
  }, 1000);
}

// fetch("https://api.peviitor.ro/v4/jobs/?start=0")
//   .then((response) => response.json())
//   .then((data) => {
//     const jobs = data.response.docs;

//     changeUrl(jobs);
//   })
//   .catch((err) => console.log(err));