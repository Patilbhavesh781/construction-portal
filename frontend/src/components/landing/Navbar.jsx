import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import useAuthStore from "../../store/authStore"

const navLinks = [
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "How it works", to: "/about" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Contact", to: "/contact" },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, user, logout, fetchProfile } = useAuthStore()
  const isTopTheme = !scrolled
  const dashboardPath = user?.role === "admin" ? "/admin/dashboard" : "/user/dashboard"

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  useEffect(() => {
    if (isAuthenticated && !user) {
      fetchProfile().catch(() => {})
    }
  }, [isAuthenticated, user, fetchProfile])

  const handleLogout = async () => {
    await logout()
    setIsOpen(false)
    navigate("/")
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${scrolled ? "bg-white/95 shadow-lg border-b border-gray-100" : "bg-black/70 border-b border-white/10"}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5">
            <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              BUILDPRO
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-orange-500 ${
                  location.pathname === link.to
                    ? "text-orange-500 font-semibold"
                    : isTopTheme
                      ? "text-white/90 hover:text-orange-400"
                      : "text-gray-700 hover:text-orange-500"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Button
                  variant="outline"
                  asChild
                  className={`rounded-full ${isTopTheme ? "border-white/40 text-white bg-transparent hover:bg-white hover:text-black" : "border-gray-300"}`}
                >
                  <Link to={dashboardPath}>Dashboard</Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className={`rounded-full ${isTopTheme ? "border-white/40 text-white bg-transparent hover:bg-white hover:text-black" : "border-gray-300 text-gray-700 hover:text-red-600"}`}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                asChild
                className={`rounded-full ${isTopTheme ? "border-white/40 text-white bg-transparent hover:bg-white hover:text-black" : "border-gray-300"}`}
              >
                <Link to="/login">Login</Link>
              </Button>
            )}
            <Button variant="default" asChild className="rounded-full px-6 shadow-lg bg-orange-500 hover:bg-orange-600">
              <Link to="/book-meeting">Book a meeting</Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className={`lg:hidden p-2 transition-colors ${isTopTheme ? "text-white hover:text-orange-400" : "text-gray-700 hover:text-orange-500"}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className={`lg:hidden pb-6 backdrop-blur-md border-b animate-in slide-in-from-top-4 duration-200 ${isTopTheme ? "bg-black/90 border-white/10" : "bg-white/95 border-gray-100"}`}>
            <div className="flex flex-col gap-3 px-4 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                    location.pathname === link.to
                      ? "text-orange-500 bg-orange-50 font-semibold"
                      : isTopTheme
                        ? "text-white/90 hover:bg-white/10 hover:text-orange-400"
                        : "text-gray-700 hover:bg-gray-100 hover:text-orange-500"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className={`flex flex-col gap-2 pt-4 border-t ${isTopTheme ? "border-white/20" : "border-gray-200"}`}>
                {isAuthenticated ? (
                  <>
                    <Button
                      variant="outline"
                      asChild
                      className={`rounded-full ${isTopTheme ? "border-white/40 text-white bg-transparent hover:bg-white hover:text-black" : ""}`}
                    >
                      <Link to={dashboardPath} onClick={() => setIsOpen(false)}>Dashboard</Link>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleLogout}
                      className={`rounded-full ${isTopTheme ? "border-white/40 text-white bg-transparent hover:bg-white hover:text-black" : "text-gray-700 hover:text-red-600"}`}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    asChild
                    className={`rounded-full ${isTopTheme ? "border-white/40 text-white bg-transparent hover:bg-white hover:text-black" : ""}`}
                  >
                    <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                  </Button>
                )}
                <Button asChild className="rounded-full bg-orange-500 hover:bg-orange-600">
                  <Link to="/book-meeting" onClick={() => setIsOpen(false)}>Book a meeting</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
