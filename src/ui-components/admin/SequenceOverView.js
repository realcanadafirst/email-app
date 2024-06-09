import { useEffect, useState } from "react";
import { fetchData } from '@ft/services/apiService';
import SequenceStepList from '@ft/ui-components/admin/SequenceStepList';

const SequenceOverView = ({ id, callStepApi, setStepCallApi, setMessage, setStepNumber }) => {
    const [setpsData, setSetpsData] = useState(null);
    useEffect(() => {
        if (callStepApi) {
            setStepCallApi(false);
            getSteps();
        }
    }, [callStepApi]);
    const getSteps = () => {
        fetchData(`/api/v1/sequence/steps?s_id=${id}`, 'GET').then((res) => {
            if (res.status === 'success') {
                setSetpsData(res.data);
                setStepNumber(res.data.length)
            } else {
                setMessage({ msg: 'Failed to get sequence steps please try again', type: 'error' });
            }
        });
    }
    return (
        <>
            {
                (setpsData && setpsData.length) ? <>
                    {
                        setpsData.map((val, index) => {
                            return <SequenceStepList stepData={val} key={index} setStepCallApi={setStepCallApi} setMessage={setMessage} />
                        })
                    } </>
                    : <p className="text-sm text-gray-500 dark:text-gray-400"> No steps to show, Add Sequence Step</p>
            }

        </>
    );
};

export default SequenceOverView;
