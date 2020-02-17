import React from 'react';
import './App.css';
import Jobs from './Jobs';

const mockJobs = [
  {title: 'Front-end Developer', company: 'Google'},
  {title: 'Java Developer', company: 'Microsoft'},
  {title: 'UI/UX Designer', company: 'GitHub'}
];

// App component will hold state.
function App() {
  return (
    <div className="App">
      <Jobs jobs={mockJobs} />
    </div>
  );
}

export default App;
