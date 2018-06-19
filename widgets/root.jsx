import React from 'react';
import Clock from './Frontend/clock';
import Tabs from './Frontend/tabs';
import Weather from './Frontend/weather';

const TabsContent = [
  {
    title: 'one',
    content: "let's put some happy little content here"
  },
  {
    title: 'two',
    content: "maybe some soccer scores"
  },
  {
    title: 'three',
    content: "even more?!?!?!"
  }
]

const Root = () => {
  return (
    <div className='app-main'>
      <Clock/>
      <Weather/>
      <span className="tab-search-container">
        <Tabs content={TabsContent}/>

      </span>
    </div>
  )
}

export default Root;
