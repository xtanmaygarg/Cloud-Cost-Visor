import React, { memo, useEffect, useState, useRef, useMemo } from 'react';
import {
    ThunderboltTwoTone,
    WarningTwoTone,
    DeleteFilled,
    AppstoreAddOutlined,
    CloseCircleOutlined,
    LoadingOutlined,
} from '@ant-design/icons';

import { Input, Tooltip, Select, Tag, Col, Row } from 'antd';
import { getComputeList } from '../../../api/list';
import { toast } from 'react-toastify';
import {
    getAlertList,
    postAlert,
    deleteAlert,
    getActionList,
    getTemplates,
    postAction,
    deleteAction,
} from '../../../api/task';

let resourceTypeMap = {
    1: 'Instance',
    2: 'Disk',
    3: 'Snapshot',
    Instance: 1,
    Disk: 2,
    Snapshot: 3,
};

const AddTaskNav = ({ changeModal, prevModal }) => {
    return (
        <div className='w-[100%] min-h-[50px] bg-[#8905F0] px-5 rounded-t flex justify-center items-center font-sourceSans font-bold font-'>
            <p className='center'>Add Action / Alerts</p>
            <button
                onClick={() => {
                    console.log('PREV:' + prevModal.current);
                    if (prevModal == 1) changeModal(1);
                    else if (prevModal == 3) changeModal(3);
                }}
                className=' flex justify-center items-center px-[10px] ml-[55%]'
            >
                <CloseCircleOutlined
                    className='transition ease-in-out hover:-translate hover:scale-110'
                    style={{
                        fontSize: '25px',
                    }}
                />
            </button>
        </div>
    );
};

const ShowTaskNav = ({ changeModal }) => {
    return (
        <div className='w-[100%] min-h-[50px] bg-[#8905F0] px-5 rounded-t flex justify-center items-center font-sourceSans font-bold text-[22px]'>
            <p className='center'>List of Alerts/Actions</p>
            <button
                onClick={() => {
                    changeModal(2);
                }}
                className=' flex justify-center items-center px-[10px] ml-[55%]'
            >
                <AppstoreAddOutlined
                    className='transition ease-in-out hover:-translate hover:scale-110'
                    style={{
                        fontSize: '30px',
                    }}
                />
            </button>
        </div>
    );
};

const MenuButtons = memo(({ computeList, setAlertList, setActionList }) => {
    let [taskType, setTaskType] = useState('');
    let [taskName, setTaskName] = useState('');
    let [resourceType, setResourceType] = useState('');
    let [resource, setResource] = useState('');
    let [budget, setBudget] = useState('');
    let [templateId, setTemplateId] = useState('');
    let [templates, setTemplates] = useState([]);
    let [allDone, setAllDone] = useState('');

    const taskTypes = [
        {
            label: 'Alert',
            value: 'Alert',
        },
        {
            label: 'Action',
            value: 'Action',
        },
    ];

    const resourceTypes = [
        {
            label: 'Disk',
            value: 'Disk',
        },
        {
            label: 'Snapshot',
            value: 'Snapshot',
        },
        {
            label: 'Instance',
            value: 'Instance',
        },
    ];

    const actions = [
        {
            label: 'Delete',
            value: 'Delete',
        },
        {
            label: 'Detach',
            value: 'Detach',
        },
    ];

    const removeDuplicates = (arr) => {
        return arr.reduce((uniqueArray, current) => {
            if (!uniqueArray.includes(current)) {
                uniqueArray.push(current);
            }
            return uniqueArray;
        }, []);
    };

    const resources = useMemo(() => {
        let list = [];
        if (resourceType == 'Disk') {
            list = computeList
                .filter((item) => {
                    return item.resourceType === 'disk';
                })
                .slice(0, 20);
        } else if (resourceType == 'Instance') {
            list = computeList
                .filter((item) => {
                    return item.resourceType === 'instance';
                })
                .slice(0, 20);
        } else if (resourceType == 'Snapshot') {
            list = computeList
                .filter((item) => {
                    return item.resourceType === 'snapshot';
                })
                .slice(0, 20);
        }

        list = list.map((item) => {
            return { label: item.resourceName, value: item.resourceName };
        });

        return removeDuplicates(list);
    }, [resourceType]);

    useMemo(() => {
        let list = [];
        if (taskType == 'Action') {
            getTemplates(resourceTypeMap[resourceType]).then((response) => {
                list = response.data.data.map((item) => {
                    return {
                        label: item.templateName,
                        value: item.templateName,
                    };
                });

                setTemplates([...removeDuplicates(list)]);
            });
        }
    }, [resourceType]);

    const onSubmit = () => {
        if (allDone) {
            if (taskType === 'Alert') {
                postAlert(
                    'arnab@gmail.com',
                    taskName,
                    resourceTypeMap[resourceType],
                    resource,
                    budget,
                ).then((response) => {
                    if (response.status == '200') {
                        toast.success('Successfully Added Alert Task!');
                        getAlertList().then((response) => {
                            setAlertList([...response.data.data]);
                        });
                    }
                });
            } else if (taskType === 'Action') {
                postAction(
                    taskName,
                    templateId,
                    resourceTypeMap[resourceType],
                    resource,
                    budget,
                ).then((response) => {
                    if (response.status == '200') {
                        toast.success('Successfully Added Action Task!');
                        getActionList().then((response) => {
                            setActionList([...response.data.data]);
                        });
                    }
                });
            }
        } else toast.error('Please fill all information');
    };

    useMemo(() => {
        if (
            taskType != '' &&
            taskName != '' &&
            resourceType != '' &&
            resource != '' &&
            budget != '' &&
            (taskType == 'Alert' || (taskType == 'Action' && templateId != ''))
        ) {
            setAllDone(true);
        } else {
            setAllDone(false);
        }
    }, [taskType, taskName, resourceType, resource, budget, templateId]);

    return (
        <div className='bellowNav  min-h-[350px]'>
            <div className=' text-white w-[100%] px-5 py-2 flex'>
                <Tag
                    className=' max-w-[150px] overflow-hidden text-[18px] '
                    color={taskType == '' ? '#1D5D9B' : '#108ee9'}
                >
                    {taskType == '' ? 'Task Type' : taskType}
                </Tag>
                <Tag
                    className=' max-w-[150px] overflow-hidden text-[18px] '
                    color={taskName == '' ? '#1D5D9B' : '#108ee9'}
                >
                    {taskName == '' ? 'Task Name' : taskName}
                </Tag>
                <Tag
                    className=' max-w-[150px] overflow-hidden text-[18px] '
                    color={resourceType == '' ? '#1D5D9B' : '#108ee9'}
                >
                    {resourceType == '' ? 'Resource Type' : resourceType}
                </Tag>
                <Tag
                    className=' max-w-[150px] overflow-hidden text-[18px] '
                    color={resource == '' ? '#1D5D9B' : '#108ee9'}
                >
                    {resource == '' ? 'Resource Info' : resource}
                </Tag>
                <Tag
                    className=' max-w-[150px] overflow-hidden text-[18px] '
                    color={budget == '' ? '#1D5D9B' : '#108ee9'}
                >
                    {' '}
                    {budget == '' ? 'Budget' : budget}
                </Tag>
                {taskType == 'Action' ? (
                    <Tag
                        className=' max-w-[150px] overflow-hidden text-[18px] '
                        color={templateId == '' ? '#1D5D9B' : '#108ee9'}
                    >
                        {templateId == '' ? 'Action' : templateId}
                    </Tag>
                ) : null}
            </div>
            <div className=' w-[100%] flex flex-wrap justify-center py-6'>
                <div className='firstRow w-[100%] px-5 py-3'>
                    <span className='h-[50px] pr-2'>
                        <Select
                            placeholder='Select Task Type'
                            style={{
                                width: 180,
                                fontWeight: 'bold',
                            }}
                            onChange={(value) => {
                                setTaskType(value);
                            }}
                            options={taskTypes}
                        />
                    </span>
                    <span className='h-[50px] pr-2'>
                        <Tooltip
                            trigger={['focus']}
                            title={'Enter Task Name'}
                            placement='topLeft'
                        >
                            <Input
                                style={{
                                    width: 145,
                                    fontWeight: 'bold',
                                }}
                                placeholder='Enter Task Name'
                                onChange={(e) => {
                                    setTaskName(e.target.value);
                                }}
                            />
                        </Tooltip>
                    </span>
                    <span className='h-[50px]'>
                        <Select
                            placeholder='Select Resource Type'
                            style={{
                                width: 200,
                                fontWeight: 'bold',
                            }}
                            onChange={(value) => {
                                setResourceType(value);
                            }}
                            options={resourceTypes}
                        />
                    </span>
                </div>
                <div className='secondRow w-[100%] px-5 py-3'>
                    <span className='h-[50px] pr-2'>
                        <Select
                            placeholder='Select Resource'
                            style={{
                                width: 180,
                                fontWeight: 'bold',
                            }}
                            onChange={(value) => {
                                setResource(value);
                            }}
                            options={resources}
                        />
                    </span>
                    <span className='h-[50px] pr-2'>
                        <Tooltip
                            trigger={['focus']}
                            title={'Enter Value In Dollar'}
                            placement='topLeft'
                        >
                            <Input
                                style={{
                                    width: 145,
                                    fontWeight: 'bold',
                                }}
                                placeholder='Enter Budget'
                                onChange={(e) => {
                                    setBudget(e.target.value);
                                }}
                            />
                        </Tooltip>
                    </span>
                    <span className='h-[50px]'>
                        {taskType == 'Action' ? (
                            <span className='w-[200px] h-[50px]'>
                                <Select
                                    placeholder='Select Type Of Action'
                                    style={{
                                        width: 200,
                                        fontWeight: 'bold',
                                    }}
                                    onChange={(value) => {
                                        setTemplateId(value);
                                    }}
                                    options={templates}
                                />
                            </span>
                        ) : null}
                    </span>
                </div>
                <div className='thirdRow w-[100%] px-5 py-10'>
                    <Tag
                        className=' max-w-[100px] overflow-hidden cursor-pointer hover:-translate hover:scale-110'
                        color={allDone ? '#87d068' : '#7D7C7C'}
                        style={{
                            width: '300px',
                            height: '40px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '1rem',
                        }}
                        onClick={onSubmit}
                    >
                        Submit
                    </Tag>
                </div>
            </div>
        </div>
    );
});

const ShowTask = ({
    changeModal,
    alertList = [],
    setAlertList,
    actionList = [],
    setActionList,
}) => {
    const modifiedAlertList = alertList.map((item) => {
        return { ...item, taskType: 'ALERT' };
    });

    const modifiedActionList = actionList.map((item) => {
        return { ...item, taskType: 'ACTION' };
    });

    const taskList = [...modifiedAlertList, ...modifiedActionList];

    const colStyleCommon = {
        backgroundColor: '#fff',
        color: 'black',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        overflow: 'hidden',
        maxHeight: '32px',
        fontSize: '20px',
        fontFamily: 'Josefin Sans',
        tranform: 'scale(1.1)',
        padding: '3px',
    };

    const showLess = (text, sliceValue = 15) => {
        if (text.length > 10) return text.slice(0, sliceValue) + '..';
        return text;
    };

    const onDelete = (taskType, id) => {
        if (taskType === 'ACTION') {
            deleteAction(id).then((response) => {
                if (response.status == '200') {
                    toast.success('Successfully Deleted Action Task!');
                } else toast.error('Please fill all information');

                getAlertList().then((response) => {
                    setAlertList([...response.data.data]);
                });

                getActionList().then((response) => {
                    setActionList([...response.data.data]);
                });
            });
        } else {
            deleteAlert(id).then((response) => {
                if (response.status == '200') {
                    toast.success('Successfully Deleted Alert Task!');
                } else toast.error('Please fill all information');

                getAlertList().then((response) => {
                    setAlertList([...response.data.data]);
                });

                getActionList().then((response) => {
                    setActionList([...response.data.data]);
                });
            });
        }
    };

    const ShowTaskRow = (item) => {
        return (
            <Row
                key={item.id}
                className='py-1 flex justify-center items-center'
            >
                <Col style={{ ...colStyleCommon }} span={2}>
                    <div className='DelBtn text-lg mt-2 ml-3 cursor-pointer'>
                        {item.actionName ? (
                            <Tooltip
                                trigger={['hover']}
                                title={item.templateId}
                                placement='topLeft'
                            >
                                <ThunderboltTwoTone twoToneColor='#9400FF' />
                            </Tooltip>
                        ) : (
                            <WarningTwoTone twoToneColor='#FFB000' />
                        )}
                    </div>
                </Col>
                <Tooltip
                    trigger={['hover']}
                    title={item.alertName ? item.alertName : item.actionName}
                    placement='topLeft'
                >
                    <Col style={{ ...colStyleCommon }} span={5}>
                        {item.alertName
                            ? showLess(item.alertName, 10)
                            : showLess(item.actionName, 10)}
                    </Col>
                </Tooltip>

                <Col style={{ ...colStyleCommon }} span={4}>
                    {resourceTypeMap[item.resourceType]}
                </Col>
                <Tooltip
                    trigger={['hover']}
                    title={item.resourceId}
                    placement='topLeft'
                >
                    <Col style={{ ...colStyleCommon }} span={8}>
                        {showLess(item.resourceId)}
                    </Col>
                </Tooltip>
                <Col style={{ ...colStyleCommon }} span={3}>
                    ${item.budget}
                </Col>
                <Col
                    style={{
                        ...colStyleCommon,
                    }}
                    span={1}
                >
                    <div className='DelBtn text-md text-[red]'>
                        <DeleteFilled
                            onClick={() => {
                                onDelete(item.taskType, item.id);
                            }}
                        />
                    </div>
                </Col>
            </Row>
        );
    };

    return (
        <div className='w-[100%] h-[100%] bg-[#313131] flex flex-col justify-start rounded text-lg'>
            {<ShowTaskNav changeModal={changeModal} />}
            {taskList.map(ShowTaskRow)}
        </div>
    );
};

const AddTask = ({ changeModal }) => {
    return (
        <>
            <img
                src='/assets/images/task.png'
                className='h-[60%]'
                alt='Task Aside'
            />
            <div
                onClick={() => {
                    changeModal(2);
                }}
                className='container flex flex-col items-center justify-center w-[30%] h-[60%] transition ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-[#8905F0] duration-300 cursor-pointer'
            >
                <AppstoreAddOutlined
                    style={{
                        fontSize: '70px',
                    }}
                />

                <div className='h-[15px]'></div>
                <div className='font-josefinSans font-bold text-[1.2rem] '>
                    Add Task
                </div>
            </div>
        </>
    );
};

const EditTask = ({
    computeList,
    changeModal,
    prevModal,
    setAlertList,
    setActionList,
}) => {
    return (
        <div className='w-[100%] h-[100%] bg-[#313131] flex flex-col justify-start rounded text-lg'>
            {<AddTaskNav changeModal={changeModal} prevModal={prevModal} />}

            {
                <MenuButtons
                    computeList={computeList}
                    setAlertList={setAlertList}
                    setActionList={setActionList}
                />
            }
        </div>
    );
};

const LoadingTask = () => {
    return (
        <div className='w-[100%] h-[100%] bg-[#313131] flex flex-col justify-start rounded text-lg'>
            <div className='w-[100%] h-[100%] flex justify-center items-center'>
                <LoadingOutlined />
            </div>
        </div>
    );
};

const TaskBox = memo(
    ({
        changeModal,
        modalToShow,
        prevModal,
        alertList,
        setAlertList,
        actionList,
        setActionList,
    }) => {
        let [computeList, setComputeList] = useState([]);

        useEffect(() => {
            if (computeList.length == 0) {
                getComputeList().then((response) => {
                    setComputeList([...response.data.data]);
                });
            }
        }, []);

        const viewChanger = () => {
            console.log(' viewChanger : ' + modalToShow);
            switch (modalToShow) {
                case 1:
                    return <AddTask changeModal={changeModal} />;
                case 2:
                    return (
                        <EditTask
                            computeList={computeList}
                            changeModal={changeModal}
                            prevModal={prevModal}
                            setAlertList={setAlertList}
                            setActionList={setActionList}
                        />
                    );
                case 3:
                    return (
                        <ShowTask
                            changeModal={changeModal}
                            alertList={alertList}
                            setAlertList={setAlertList}
                            actionList={actionList}
                            setActionList={setActionList}
                        />
                    );
                default:
                    return <LoadingTask />;
            }
        };

        return (
            <div className='transition-all ease-in-out rounded w-[50%] h-[90%] bg-[#313131] flex justify-center gap-3 items-center'>
                {viewChanger != prevModal ? viewChanger() : null}
            </div>
        );
    },
);

const Task = memo(() => {
    let [modalToShow, setModalToShow] = useState(0);
    let [alertList, setAlertList] = useState([]);
    let [actionList, setActionList] = useState([]);
    const prevModal = useRef(0);

    useEffect(() => {
        getAlertList().then((resonse) => {
            setAlertList([...resonse.data.data]);
        });
        getActionList().then((response) => {
            setActionList([...response.data.data]);
        });
    }, []);

    useEffect(() => {
        prevModal.current = modalToShow;
    }, [modalToShow]);

    useEffect(() => {
        // console.log(actionList);
        if (alertList.length > 0 || actionList.length > 0) setModalToShow(3);
        else setModalToShow(1);
    }, [alertList, actionList]);

    const changeModal = (switchComp) => {
        setModalToShow(switchComp);
    };

    return (
        <TaskBox
            changeModal={changeModal}
            modalToShow={modalToShow}
            prevModal={prevModal.current}
            alertList={alertList}
            setAlertList={setAlertList}
            actionList={actionList}
            setActionList={setActionList}
        />
    );
});

export default Task;
