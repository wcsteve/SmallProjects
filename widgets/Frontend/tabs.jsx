import React from 'react';

class Tabs extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      tabSelected: 0,
    }
  }

  changeTab(index) {
    this.setState({tabSelected: index})
  }

  render(){
    const content = this.props.content
    const tabs = content.map((tab, index) => {
      let klass = 'tab';
      if (index === this.state.tabSelected) klass = 'active';
      return (
        <li className={klass} onClick={() => this.changeTab(index)} key={index}>
          {tab.title}
        </li>
      )
    })

    return(
      <div className='tabs'>
        <h1 className='tabs-title'> Tabs </h1>
        <header>
          <ul className='tab-list'>
            {tabs}
          </ul>
        </header>

        <article className='tab-content'>
          <p>{content[this.state.tabSelected].content}</p>
        </article>


      </div>
    )
  }
}

export default Tabs;
