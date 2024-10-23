import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';

export const NavigateHome = () => {
  let navigate = useNavigate()
  setTimeout(() => {
    toast.error("404 Not Found");
    navigate("/")
  }, 100)
  return null;
}