# Changesets

This directory is managed by [Changesets](https://github.com/changesets/changesets).

## Workflow

1. After making changes, run `npm run changeset` and follow the prompts.
2. Select which packages changed and the bump type (patch/minor/major).
3. Write a summary — this becomes the changelog entry.
4. Commit the generated `.md` file alongside your code changes.
5. On merge to `main`, the release workflow applies versions and publishes.
