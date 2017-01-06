import React from 'react';
import { Table, Input, Button, Spin, Modal, InputNumber, notification } from 'ant-design';
import { PieChart, Pie, Legend, Cell, Tooltip, Bar, BarChart,
    LineChart, Line, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import { scaleOrdinal, schemeCategory10 } from 'd3-scale';
import styles from './index.less';
import verification from 'helpers/verification';

const colors = scaleOrdinal(schemeCategory10).range();
const data1 = [
    { name: '今日发卡量', value: 400 },
    { name: '总发卡量', value: 7000 },
    { name: '剩下发卡量', value: 9000 },
];

const data2 = [
    { name: 'Page A', uv: 1000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 300, pv: 4567, amt: 2400 },
    { name: 'Page C', uv: 280, pv: 1398, amt: 2400 },
    { name: 'Page D', uv: 200, pv: 9800, amt: 2400 },
    { name: 'Page E', uv: 278, pv: 3908, amt: 2400 },
    { name: 'Page F', uv: 189, pv: 4800, amt: 2400 },
    { name: 'Page G', uv: 189, pv: 4800, amt: 2400 },
    { name: 'Page H', uv: 189, pv: 4800, amt: 2400 },
    { name: 'Page I', uv: 189, pv: 4800, amt: 2400 },
    { name: 'Page J', uv: 189, pv: 4800, amt: 2400 },
    { name: 'Page A', uv: 1000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 300, pv: 4567, amt: 2400 },
    { name: 'Page C', uv: 280, pv: 1398, amt: 2400 },
    { name: 'Page D', uv: 200, pv: 9800, amt: 2400 },
    { name: 'Page E', uv: 278, pv: 3908, amt: 2400 },
    { name: 'Page F', uv: 189, pv: 4800, amt: 2400 },
    { name: 'Page G', uv: 189, pv: 4800, amt: 2400 },
    { name: 'Page H', uv: 189, pv: 4800, amt: 2400 },
    { name: 'Page I', uv: 189, pv: 4800, amt: 2400 },
    { name: 'Page J', uv: 189, pv: 4800, amt: 2400 },
];

const data3 = [
    { name: '男', value: 400 },
    { name: '女', value: 7000 },
];

const data4 = [
  { name: '1-10', uv: 2000 },
  { name: '11-20', uv: 3300 },
  { name: '21-40', uv: 3200 },
  { name: '40-80', uv: 2800 },
];

export default class Statistics extends React.Component {
    render () {
        return (
            <div className={styles.container}>
                <div className={styles.topContainer}>
                    <div className={styles.topLeft}>
                        发卡信息统计
                    </div>
                    <div className={styles.topRight}>
                        <PieChart width={400} height={260}>
                            <Legend />
                            <Pie cx={200} cy={130} startAngle={0} endAngle={360} outerRadius={80} label>
                                {
                                    data1.map((item, i) => (
                                        <Cell key={i} name={item.name} value={item.value} fill={colors[i]} />
                                    ))
                                }
                            </Pie>
                        </PieChart>
                    </div>
                </div>
                <div className={styles.midContainer}>
                    <div className={styles.midLeft}>
                        日消费统计
                    </div>
                    <div className={styles.midRight}>
                        <LineChart
                            width={800}
                            height={260}
                            data={data2}
                            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                            syncId='test'
                            >
                            <CartesianGrid stroke='#f5f5f5' />
                            <Legend />
                            <XAxis />
                            <YAxis />
                            <Tooltip />
                            <Line type='monotone' dataKey='uv' stroke='#ff7300' />
                            <Line type='monotone' dataKey='pv' stroke='#ff7300' />
                            <Line type='monotone' dataKey='amt' stroke='#ff7300' />
                        </LineChart>
                    </div>
                </div>
                <div className={styles.bottomContainer}>
                    <div className={styles.bottomSectionContainer}>
                        <div className={styles.bottomLeft}>
                            消费性别比例
                        </div>
                        <div className={styles.bottomRight}>
                            <PieChart width={400} height={260}>
                                <Legend />
                                <Pie cx={200} cy={130} startAngle={0} endAngle={360} outerRadius={80} label>
                                    {
                                        data3.map((item, i) => (
                                            <Cell key={i} name={item.name} value={item.value} fill={colors[i]} />
                                        ))
                                    }
                                </Pie>
                            </PieChart>
                        </div>
                    </div>
                    <div className={styles.bottomSectionContainer}>
                        <div className={styles.bottomLeft}>
                            消费年龄比例
                        </div>
                        <div className={styles.bottomRight}>
                            <BarChart width={400} height={260} data={data4}>
                                <XAxis dataKey='name' />
                                <YAxis />
                                <Tooltip />
                                <CartesianGrid vertical={false} />
                                <Bar dataKey='uv' fill='#ff7300' />
                                <Legend layout='vertical' />
                            </BarChart>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
