# Changesets

This directory contains changesets for managing version updates and changelog generation for the bun-infisical Docker image.

## How to add a changeset

When you make changes that should result in a version bump (e.g., updating Bun or Infisical CLI versions, adding new features, or fixing bugs):

1. Run `bun run changeset`
2. Follow the prompts to describe your changes
3. Choose the appropriate version bump type (major, minor, or patch)
4. Commit the changeset file

## Version types

- **major**: Breaking changes (e.g., Bun major version bump, breaking API changes)
- **minor**: New features (e.g., adding new tools, enhancing functionality)
- **patch**: Bug fixes, dependency updates, minor improvements

## Release process

When changesets are present on the main branch, the CI workflow will automatically:

1. Create a release PR with version bumps
2. Update the changelog
3. When merged, tag the release and trigger Docker image rebuild

## Docker image versioning

For this Docker image project, changesets will primarily be used to:

- Track when Bun or Infisical CLI versions are updated
- Document significant changes to the image
- Coordinate releases with updated Docker tags

Example changeset message:

```
"Update Bun to 1.4.2 and Infisical CLI to 0.43.129"
```
