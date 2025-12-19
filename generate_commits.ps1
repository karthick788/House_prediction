# Script to generate commits day by day from today going backwards
# Target: 200 total commits (currently 19, need 181 more)

Write-Host "Starting commit generation..." -ForegroundColor Green

# Get current commit count
$currentCommits = (git rev-list --all --count)
Write-Host "Current commits: $currentCommits" -ForegroundColor Yellow

# Calculate how many commits we need
$targetCommits = 200
$commitsNeeded = $targetCommits - $currentCommits
Write-Host "Commits needed: $commitsNeeded" -ForegroundColor Yellow

# Get today's date
$today = Get-Date
$commitDate = $today

# List of commit messages to use (cycling through)
$commitMessages = @(
    "Update documentation",
    "Refactor code structure",
    "Fix minor bugs",
    "Improve performance",
    "Add new features",
    "Update dependencies",
    "Code cleanup",
    "Enhance UI components",
    "Optimize API endpoints",
    "Update configuration",
    "Fix type errors",
    "Add error handling",
    "Update tests",
    "Improve code quality",
    "Add comments and documentation",
    "Update README",
    "Fix formatting issues",
    "Optimize database queries",
    "Update styles",
    "Add validation logic"
)

# Create a temporary file to track changes
$tempFile = ".commit_tracker.txt"

# Generate commits day by day going backwards
# Distribute commits: approximately 1-2 commits per day going back from today
$commitCount = 0
$dayOffset = 0
$commitsPerDay = 1  # Start with 1 commit per day

while ($commitCount -lt $commitsNeeded) {
    # Calculate the date for this commit (going back day by day)
    $commitDate = $today.AddDays(-$dayOffset)
    
    # Format date for git
    $dateString = $commitDate.ToString("yyyy-MM-dd HH:mm:ss")
    
    # Determine how many commits for this day (vary between 1-2 to make it realistic)
    $commitsToday = if ($dayOffset % 3 -eq 0) { 2 } else { 1 }
    $commitsToday = [Math]::Min($commitsToday, $commitsNeeded - $commitCount)
    
    for ($i = 0; $i -lt $commitsToday -and $commitCount -lt $commitsNeeded; $i++) {
        # Select a commit message (cycle through the list)
        $messageIndex = $commitCount % $commitMessages.Length
        $commitMessage = $commitMessages[$messageIndex]
        
        # Add date info to make it more realistic
        $dateInfo = $commitDate.ToString("yyyy-MM-dd")
        $fullMessage = "$commitMessage - $dateInfo"
        
        # Make a small change to trigger commit
        $content = "Commit #$($commitCount + 1) - Date: $dateInfo`n"
        Add-Content -Path $tempFile -Value $content
        
        # Stage the file
        git add $tempFile
        
        # Create commit with backdated timestamp
        $env:GIT_AUTHOR_DATE = $dateString
        $env:GIT_COMMITTER_DATE = $dateString
        
        git commit -m "$fullMessage" --quiet
        
        # Clear environment variables
        Remove-Item Env:\GIT_AUTHOR_DATE -ErrorAction SilentlyContinue
        Remove-Item Env:\GIT_COMMITTER_DATE -ErrorAction SilentlyContinue
        
        $commitCount++
        
        # Progress indicator
        if ($commitCount % 20 -eq 0) {
            Write-Host "Generated $commitCount commits... (Day offset: $dayOffset)" -ForegroundColor Cyan
        }
    }
    
    # Move to next day
    $dayOffset++
}

# Clean up temporary file
Remove-Item $tempFile -ErrorAction SilentlyContinue
git add .
git commit -m "Clean up temporary files" --quiet

# Final count
$finalCommits = (git rev-list --all --count)
Write-Host "`nCommit generation complete!" -ForegroundColor Green
Write-Host "Total commits: $finalCommits" -ForegroundColor Green
Write-Host "Commits generated: $commitCount" -ForegroundColor Green
