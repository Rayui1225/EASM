package api

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// NewRouter creates a new router with all application routes defined
func NewRouter() *gin.Engine {
	// Create default gin router with Logger and Recovery middleware
	r := gin.Default()

	// CORS configuration
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, // Frontend address
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposeHeaders:    []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300 * 60 * 60, // Maximum value in seconds
	}))

	// Routes
	r.GET("/api/health", healthCheckHandler)

	// API routes here
	v1 := r.Group("/api/v1")
	{
		// Example route
		v1.GET("/example", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"message": "This is an example endpoint"})
		})
		// Add more routes here
	}

	return r
}

// healthCheckHandler returns a 200 OK response for health checking
func healthCheckHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"status": "ok"})
}
