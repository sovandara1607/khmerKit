# Contributing to KhmerKit

Thank you for your interest in contributing to KhmerKit! We welcome contributions that improve Khmer text processing, document retrieval, evaluation benchmarks, and documentation.

---

## Code of Conduct

Please review our [Code of Conduct](CODE_OF_CONDUCT.md) before participating in the community.

---

## Getting Started

1. **Fork the repository** on GitHub: [https://github.com/sovandara1607/khmerKit](https://github.com/sovandara1607/khmerKit)
2. **Clone your fork locally**:
   ```bash
   git clone https://github.com/<your-username>/khmerKit.git
   cd khmerKit
   ```
3. **Set up Python development environment**:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -e '.[dev]'
   ```
4. **Set up Frontend environment** (if contributing to the web app):
   ```bash
   cd apps/web
   npm install
   ```

---

## Development Workflow

### Python Package & Backend
- Write unit tests in `tests/` for any new functionality or bug fixes.
- Run tests:
  ```bash
  pytest -v
  ```
- Ensure type annotations are clean and consistent.

### Web Application (`apps/web`)
- Preserve the existing zero-radius dark design system and Google Sans typography.
- Run typecheck and build before submitting:
  ```bash
  cd apps/web
  npm run typecheck
  npm run build
  ```

---

## Submitting Pull Requests

1. Create a feature branch:
   ```bash
   git checkout -b feat/my-improvement
   ```
2. Commit your changes with clear, descriptive commit messages.
3. Push to your fork and open a Pull Request against the `main` branch.
4. Fill out the Pull Request template describing your changes, test evidence, and any relevant issue references.

---

## License

By contributing to KhmerKit, you agree that your contributions will be licensed under the project's [Apache-2.0 License](LICENSE).
