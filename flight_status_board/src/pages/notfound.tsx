import { useNavigate } from "react-router-dom"

export const NavigateHome = () => {
  let navigate = useNavigate()
  setTimeout(() => {
    navigate("/")
  }, 100)
  return null;
}