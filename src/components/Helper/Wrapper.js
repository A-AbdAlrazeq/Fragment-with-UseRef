const Wrapper = (props) => {
  return props.children;
};
/*  create a component that uses the built-in children component
 to wrap nested components in JSX as if they were HTML elements.
  Finally, you’ll pass components as props to create flexible wrappers 
  that can embed custom JSX in multiple locations in a component.*/
export default Wrapper;
