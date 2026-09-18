# https://sdetqa.vercel.app/autoplay
# https://demo.guru99.com/test/drag_drop.html
# https://gotranscript.com/text-compare
# https://demowebshop.tricentis.com/
# https://www.worldometers.info/geography/flags-of-the-world/
# https://www.booksbykilo.in/new-books?pricerange=201to500
# https://shop.polymer-project.org/



Complete real-world daily workflow
This is the sequence I'd recommend memorizing:
# START OF DAY

git status
git branch --show-current
git fetch origin
git merge origin/main

# DEVELOP
# Write/modify Playwright tests

git status
git diff

# TEST
npx playwright test

# SAVE YOUR WORK
git add .
git commit -m "Add login automation tests"

# BEFORE PUSHING
git fetch origin
git merge origin/main

# TEST AGAIN AFTER MERGE
npx playwright test

# PUSH
git push origin feature/login-tests
⭐ The golden sequence
             DAILY GIT WORKFLOW

                 START
                   ↓
              git status
                   ↓
           git fetch origin
                   ↓
         git merge origin/main
                   ↓
              WRITE CODE
                   ↓
            RUN PLAYWRIGHT
                   ↓
              git add .
                   ↓
             git commit
                   ↓
           git fetch origin
                   ↓
         git merge origin/main
                   ↓
       Resolve conflicts if any
                   ↓
          RUN PLAYWRIGHT AGAIN
                   ↓
              git push
                   ↓
                  PR
                   ↓
              CODE REVIEW
                   ↓
             MERGE TO MAIN
One important team rule
Don't do this:
git checkout main
# write automation code
git push
Instead:
main
  │
  └── feature/login-tests
             │
             ├── Write Playwright tests
             ├── Commit
             ├── Update from main
             ├── Test
             └── Push
                    │
                    ↓
                   PR
                    │
                    ↓
                  main
For a Playwright project, a very common branch naming pattern is:
feature/login-tests
feature/payment-tests
feature/checkout-tests
bugfix/login-failure
bugfix/locator-issue
If you remember only one thing, remember:
Before PUSH → FETCH → MERGE main → RESOLVE → TEST → PUSH.

That is the habit that will save you from many avoidable merge-conflict problems.