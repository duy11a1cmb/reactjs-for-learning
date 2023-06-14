export default function logger(reducer) {
  return (prevState, action, args) => {
    console.group(action);
    console.log('prev State', prevState);
    console.log('prev args', args);
    const nextState = reducer(prevState, action, args);
    console.log('next args', nextState);
    console.groupEnd();
    return nextState;
  }
}