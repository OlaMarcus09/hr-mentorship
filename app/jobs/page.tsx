import Link from 'next/link';

async function getJobs() {
  const res = await fetch('http://localhost:3000/api/jobs', { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Remote HR Jobs</h1>
        <button className="bg-black text-white px-4 py-2 rounded">Post a Job</button>
      </div>
      
      <div className="grid gap-4">
        {jobs.map((job: any) => (
          <div key={job.id} className="border p-5 rounded-lg flex justify-between items-center bg-white shadow-sm">
            <div>
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p className="text-gray-600">{job.company}</p>
              <div className="flex gap-2 mt-2 text-sm text-gray-500">
                <span className="bg-gray-100 px-2 py-1 rounded">{job.type}</span>
                <span className="bg-gray-100 px-2 py-1 rounded">{job.location}</span>
              </div>
            </div>
            <button className="text-blue-600 font-medium">Apply &rarr;</button>
          </div>
        ))}
      </div>
    </div>
  );
}
