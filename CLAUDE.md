# PLAN.md — 3-Week Docker/Kubernetes Hands-on Roadmap

> **Goal:** Deploy a container app built locally to a local Kubernetes cluster (kind), and run through the full pipeline once, including CI/CD, IaC, and monitoring.
> **Strategy:** Not aiming for mastery. "Run through the whole flow once to get a feel for what each piece is." Depth comes through repetition.
> **Environment:** Windows + WSL2 (Ubuntu) + Rancher Desktop + kind — **local only** (no permissions on the company GCP project)

---

## Phase 0 — Environment Setup

- [x] Enable WSL2 + install Ubuntu (`wsl --install`)
- [x] Install Rancher Desktop (WSL2 backend, dockerd/moby mode) → verify `docker version` works (built-in k8s turned off, standardizing on kind)
- [x] Install tools inside WSL Ubuntu: `kubectl`, `kind`, `helm` (kubectl/helm provided by Rancher Desktop, kind v0.33.0 installed separately)
- [x] Install `gcloud` CLI + gke-gcloud-auth-plugin (not used in this study)
- [x] `kind create cluster --name study` → verified `study-control-plane Ready` (k8s v1.37.0)
- [ ] Check Rancher Desktop WSL memory allocation — **8GB+ recommended** (Week 3 runs Argo CD + Prometheus at the same time)
- [ ] Add `.gitignore` + clean up `Zone.Identifier` files

## Week 1 — Containers & Docker

- [x] Understand what a container is (vs. a VM) — namespaces/cgroups, image vs. container, shared kernel
- [x] Basics of image pull / container run / logs / exec — with nginx: run -d -p, logs, exec -it, top, verified the ephemeral filesystem
- [ ] Write a Dockerfile for a simple web app (Node) ← **start here next session**. server.js, package.json, and .dockerignore are ready in `week1-app/`. Write the Dockerfile myself → `docker build -t week1-app:1.0 .` → run → verify with curl
- [ ] Reduce image size with a **multi-stage build**
- [ ] Get a feel for image tagging and versioning
- [ ] Run a **local registry** (`registry:2` container) and push/pull — experience the "push to a registry → cluster pulls from it" flow (replaces Artifact Registry)
- [ ] (Review) Ask Claude Code again about anything that confused me this week

## Week 2 — Kubernetes (kind)

- [ ] **Recreate the kind cluster as multi-node** with a config file (`kind-config.yaml`) — 1 control-plane + 2 workers, connected to the local registry (see the local registry page in the kind docs)
- [ ] Core objects: Pod / Deployment / ReplicaSet — kill one worker node with `docker stop` and watch Pods get rescheduled
- [ ] Service (ClusterIP / NodePort / LoadBalancer differences) — for LoadBalancer, get a real EXTERNAL-IP with **cloud-provider-kind**
- [ ] Separate configuration with ConfigMap / Secret
- [ ] Ingress concept → external exposure with **Gateway API** (not using ingress-nginx since it's been retired; implementation e.g. Envoy Gateway)
- [ ] Deploy the Week 1 app to the kind cluster → complete one code → Docker → Kubernetes cycle
- [ ] (Optional) Install **Knative** and try a serverless deployment — Cloud Run is based on the Knative API, so the concepts carry over directly
- [ ] (SA point) List **what GKE does for me** out of everything I did by hand this week

## Week 3 — CI/CD & IaC & Monitoring & Integration

- [ ] Push the code to a GitHub repository
- [ ] **GitHub Actions**: automate push → image build → push to **GHCR** (GitHub Container Registry)
- [ ] **Terraform** intro: codify "cluster creation + Argo CD installation" with the `kind` + `helm` providers — init / plan / apply / destroy, the concept of state
- [ ] **Argo CD** GitOps deployment (Git is the deployment state). Images pulled from GHCR (simple if the package is public; imagePullSecret if private)
- [ ] Install Prometheus + Grafana with `kube-prometheus-stack` (Helm)
- [ ] Check cluster and app metrics on a Grafana dashboard
- [ ] A few very basic PromQL queries
- [ ] 🎯 **Connect everything**: code push → CI → CD → reflected in Grafana, as one flow
- [ ] Re-practice weak spots + organize concepts for interview/real-world questions

> 💡 Splitting roles as "Terraform for infrastructure (cluster, foundational tools), Argo CD for app deployment" is a common pattern in practice.

---

## Not Now (Later)

- Jenkins (skim the concept and history only — for interviews)
- Advanced PromQL
- minikube / k3d (standardizing on kind)
- Writing Helm charts myself

## Candidate Next Steps After Completion

- IAM / permission management (core of SA work)
- Tie into PCA (Professional Cloud Architect) prep