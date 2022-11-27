// import React from 'react'
// import { useSelector} from "react-redux";
// import {Route,redirect } from "react-router-dom";

// const ProtectedRoute = ({element: Element, ...rest}) => {
    
//   const {isAuthenticate, newUser, loading} = useSelector((state)=> state.user)

//   return (
//     <>
//       {!loading &&
//       (
//         <Route  {...rest} 
//         render = {(props)=> {
//             if (!isAuthenticate) {
//                 return <redirect  to ={"/auth/loginUser"}/>
//             }

//             return <Element {...props} />
//         }}
        
//         />
//       )
      
//       }
//     </>
//   )
// }

// export default ProtectedRoute
