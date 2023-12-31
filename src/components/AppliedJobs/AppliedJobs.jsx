import React, { useState } from 'react';
import { getDataFromDb } from '../../Utilities/Utils';
import { useLoaderData } from 'react-router-dom';
import AppliedCard from './AppliedCard';

const AppliedJobs = () => {
    const [whichData, setWhichData] = useState('default')
    // filter button 
    const [isOpen, setIsOpen] = useState(false)

    // onsite filters 
    const [onsite, setOnsite] = useState([])

    // remote filters 
    const [remote, setRemote] = useState([])

    const allData = useLoaderData();
    const appliedDataDb = getDataFromDb();


    let showAppliedData = [];
    for (const appliedId of appliedDataDb) {
        const appliedData = allData.filter(data => data.jobId === appliedId)
        showAppliedData.push(...appliedData);
    }

    const onsiteJob = () => {
        // onsite filtering 
        const onsiteJobs = showAppliedData.filter(data => data.timingType === 'Onsite');
        setOnsite(onsiteJobs)
        setWhichData('Onsite')
    }

    const remoteJob = () => {
        // remote filtering 
        const remoteJobs = showAppliedData.filter(data => data.timingType === 'Remote');
        setRemote(remoteJobs)
        setWhichData('Remote')
    }


    return (
        <div>
            <div className='text-center py-28 relative bg-indigo-50 rounded-lg'>
                <h1 className='text-3xl font-bold text-gray-900'>Applied Jobs</h1>
            <div className='absolute bottom-0 left-0'>
                <img src='https://i.ibb.co/vXKxYx8/Vector.png' alt="" />
            </div>
            </div>
            <div className='text-right w-4/6 mx-auto my-16'>
                <div className='relative'>
                    <button onClick={() => setIsOpen(!isOpen)} className='flex items-center gap-2 ml-auto py-3 px-6 bg-gray-200 rounded-lg text-gray-900 text-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2'>Filter By
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
                        </svg>
                    </button>
                    {
                        isOpen && <div className='absolute text-right right-0 '>
                            <br /> <button onClick={remoteJob} className='py-3 px-6 bg-gray-200 rounded-lg text-gray-900 mt-3 hover:shadow-lg font-semibold transition-all duration-300'>remote</button> <br />
                            <button onClick={onsiteJob} className='py-3 px-6 bg-gray-200 rounded-lg text-gray-900 mt-3 hover:shadow-lg font-semibold transition-all duration-300'>on-site</button>
                        </div>
                    }
                </div>
            </div>
            <div className='flex flex-col w-4/6 mx-auto gap-7 my-16'>
                {
                    whichData === 'Onsite' ? onsite.map(data => <AppliedCard key={data.jobId} data={data}></AppliedCard>) : 
                    whichData === 'Remote' ? remote.map(data => <AppliedCard key={data.jobId} data={data}></AppliedCard>) : 
                    showAppliedData.map(data => <AppliedCard key={data.jobId} data={data}></AppliedCard>)
                    
                }
            </div>
        </div>
    );
};

export default AppliedJobs;