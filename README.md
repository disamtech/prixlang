# Prixlang
Power your code with Prix: the TypeScript-based programming language that illuminates your projects with its speed and clarity.

## Installation
First, you need to install *Deno*.

**Using Shell (macOS and Linux):**
`curl -fsSL https://deno.land/x/install/install.sh | sh`

**Using PowerShell (Windows):**
`irm https://deno.land/install.ps1 | iex`

**Using Scoop (Windows):**
`scoop install deno`

**Using Chocolatey (Windows):**

`choco install deno`

**Using Homebrew (macOS):**

`brew install deno`

**Using Nix (macOS and Linux):**

`nix-shell -p deno`

**Build and install from source using Cargo:**

`cargo install deno --locked`

To test if you have Deno installed go to the terminal and run `deno --version` | To upgrade Deno run `deno upgrade`

## Basics
**Environment variables**
If you want to use environment variables in Prix you need to go to /core/runtime/environment.ts and go to env.declareVar() and change it
*Posibilities:* At the moment you can make environment variables with boolean, number and null (not string). 
METHODS: 
> `MK_NULL()`
> `MK_NUMBER(number)`
> `MK_BOOL(true/false)`
