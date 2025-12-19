#!/usr/bin/env python3
"""
Script to generate commits day by day starting from today going backwards.
This will create 181 commits to reach a total of 200 commits.
"""

import subprocess
import sys
import os
from datetime import datetime, timedelta
import random

def run_git_command(command, env=None):
    """Run a git command and return the result."""
    try:
        result = subprocess.run(
            command,
            shell=True,
            capture_output=True,
            text=True,
            check=True,
            env=env
        )
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        print(f"Error running command: {command}")
        print(f"Error: {e.stderr}")
        return None

def get_commit_messages():
    """Return a list of realistic commit messages."""
    messages = [
        "Update documentation",
        "Fix minor bug",
        "Refactor code",
        "Add new feature",
        "Improve performance",
        "Update dependencies",
        "Fix typo",
        "Optimize code",
        "Add comments",
        "Update config",
        "Clean up code",
        "Fix formatting",
        "Add error handling",
        "Update README",
        "Fix linting issues",
        "Improve UI",
        "Add tests",
        "Update styles",
        "Fix API endpoint",
        "Add validation",
        "Update model",
        "Improve accuracy",
        "Add logging",
        "Fix security issue",
        "Update deployment",
        "Add new endpoint",
        "Fix CORS",
        "Update dependencies",
        "Improve error messages",
        "Add documentation",
        "Fix bug",
        "Refactor component",
        "Update UI",
        "Add feature",
        "Fix issue",
        "Update config",
        "Improve code",
        "Add validation",
        "Fix typo",
        "Update styles"
    ]
    return messages

def generate_commits(total_needed=181):
    """Generate commits day by day starting from today going backwards."""
    
    # Get current commit count
    current_count = run_git_command("git rev-list --all --count")
    if current_count:
        current_count = int(current_count)
        print(f"Current commits: {current_count}")
    else:
        print("Could not get current commit count")
        return
    
    # Calculate how many commits we need
    commits_needed = total_needed - current_count
    if commits_needed <= 0:
        print(f"Already have {current_count} commits. Need {total_needed} total.")
        return
    
    print(f"Generating {commits_needed} commits...")
    
    # Get commit messages
    commit_messages = get_commit_messages()
    
    # Create a file to track commits
    commit_log_file = "commit_history.txt"
    
    # Start from today and go backwards
    current_date = datetime.now()
    
    # Calculate commits per day (distribute evenly)
    days_needed = max(1, commits_needed // 3)  # About 3 commits per day on average
    commits_per_day = max(1, commits_needed // days_needed)
    
    commit_num = 0
    
    for day_offset in range(days_needed):
        date = current_date - timedelta(days=day_offset)
        date_str = date.strftime("%Y-%m-%d %H:%M:%S")
        
        # Number of commits for this day (vary between 1-5)
        commits_today = random.randint(1, min(5, commits_needed - commit_num))
        if commit_num + commits_today > commits_needed:
            commits_today = commits_needed - commit_num
        
        for commit_in_day in range(commits_today):
            if commit_num >= commits_needed:
                break
            
            # Pick a random commit message
            message = random.choice(commit_messages)
            
            # Add entry to commit log
            with open(commit_log_file, "a", encoding="utf-8") as f:
                f.write(f"Commit {current_count + commit_num + 1}: {message} - {date_str}\n")
            
            # Stage the file
            run_git_command(f'git add {commit_log_file}')
            
            # Create commit with specific date
            commit_date = date - timedelta(hours=random.randint(0, 23), 
                                          minutes=random.randint(0, 59))
            date_env = commit_date.strftime("%Y-%m-%d %H:%M:%S")
            
            # Set environment variables for git commit date
            env = os.environ.copy()
            env['GIT_AUTHOR_DATE'] = date_env
            env['GIT_COMMITTER_DATE'] = date_env
            
            # Use git commit with date
            message_escaped = message.replace('"', '\\"')
            cmd = f'git commit -m "{message_escaped}"'
            result = run_git_command(cmd, env=env)
            
            if result is not None:
                commit_num += 1
                if commit_num % 10 == 0:
                    print(f"Generated {commit_num}/{commits_needed} commits...")
            else:
                print(f"Failed to create commit {commit_num + 1}")
    
    print(f"\nSuccessfully generated {commit_num} commits!")
    print(f"Total commits now: {current_count + commit_num}")
    
    # Verify final count
    final_count = run_git_command("git rev-list --all --count")
    if final_count:
        print(f"Verified total commits: {final_count}")

if __name__ == "__main__":
    try:
        generate_commits(200)
    except KeyboardInterrupt:
        print("\n\nProcess interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\nError: {e}")
        sys.exit(1)

