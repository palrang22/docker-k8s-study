# PLAN.md — 도커/쿠버네티스 3주 실습 로드맵

> **목표:** 로컬에서 만든 컨테이너 앱을 GCP(GKE)에 올리고, CI/CD·모니터링까지 전체 파이프라인 한 바퀴.
> **전략:** 마스터 X. "전체 흐름 한 바퀴 돌려서 각 조각이 뭔지 감 잡기". 깊이는 반복으로.
> **환경:** Windows + WSL2(Ubuntu) + Rancher Desktop + kind

---

## Phase 0 — 환경 세팅 (Day 1~2)

- [x] WSL2 활성화 + Ubuntu 설치 (`wsl --install`)
- [x] Rancher Desktop 설치 (WSL2 백엔드, dockerd/moby 모드) → `docker version` 동작 확인 (내장 k8s는 끔, kind로 통일)
- [x] WSL Ubuntu 안에 도구 설치: `kubectl`, `kind`, `helm` (kubectl/helm은 Rancher Desktop 제공, kind v0.33.0 별도 설치)
- [~] GCP 계정 + 예산 알림 — 회사 실습 프로젝트 `kktae-demo` 사용(회사 결제 계정). 개인 계정 로그인 불가. 예산 알림은 권한상 못 걸 수 있음 → 대신 세션 종료 시 LB/클러스터 삭제 확인으로 갈음
- [x] `gcloud` CLI 설치 (apt, WSL) + `gcloud auth login` (`kseungh@mz.co.kr`) + gke-gcloud-auth-plugin
- [x] `kind create cluster --name study` → `study-control-plane Ready` (k8s v1.37.0) 확인

## Week 1 — 컨테이너 & 도커

- [x] 컨테이너가 뭔지 개념 잡기 (VM과의 차이) — namespace/cgroups, 이미지 vs 컨테이너, 커널 공유
- [x] 이미지 pull / 컨테이너 run / logs / exec 기본기 — nginx로 run -d -p, logs, exec -it, top, 휘발성 파일시스템 확인
- [ ] 간단한 웹 앱(Node) Dockerfile 작성 ← **다음 세션 여기부터**. `week1-app/`에 server.js·package.json·.dockerignore 준비됨. Dockerfile 직접 작성 → `docker build -t week1-app:1.0 .` → run → curl 확인
- [ ] **멀티스테이지 빌드**로 이미지 크기 줄여보기
- [ ] 이미지 태그·버전 관리 감 잡기
- [ ] GCP **Artifact Registry** 저장소 생성 + 이미지 push
- [ ] (되짚기) 이번 주 헷갈린 것 Claude Code한테 되묻기

## Week 2 — 쿠버네티스 & GKE

- [ ] 핵심 오브젝트: Pod / Deployment / ReplicaSet
- [ ] Service (ClusterIP / NodePort / LoadBalancer 차이)
- [ ] ConfigMap / Secret로 설정 분리
- [ ] Ingress로 외부 노출
- [ ] kind 클러스터에 Week 1 앱 배포 → 코드→도커→쿠버 한 사이클 완성
- [ ] ⭐ **GKE Autopilot** 클러스터 생성
- [ ] 같은 앱을 GKE에 배포 (로컬 vs 클라우드 차이 체감)
- [ ] **Cloud Run**에도 한 번 배포 (서버리스 컨테이너 찍먹)
- [ ] (SA 포인트) 관리형 GKE가 나 대신 해주는 게 뭔지 정리

## Week 3 — CI/CD & 모니터링 & 통합

- [ ] GitHub 저장소에 코드 올리기
- [ ] **GitHub Actions**: push → 이미지 빌드 → Artifact Registry push 자동화
- [ ] **Argo CD** 설치 + GitOps 방식 배포 (Git이 곧 배포 상태)
- [ ] `kube-prometheus-stack` (Helm)로 Prometheus + Grafana 설치
- [ ] Grafana 대시보드에서 클러스터·앱 메트릭 확인
- [ ] PromQL 아주 기초 쿼리 몇 개
- [ ] 🎯 **전체 연결**: 코드 push → CI → CD → Grafana 반영까지 한 흐름으로
- [ ] 약한 부분 재실습 + 면접/실무 질문 대비 개념 정리

---

## 지금은 안 함 (나중에)

- 젠킨스 (개념·역사만 훑기 — 면접용)
- PromQL 심화
- minikube / k3d (kind로 통일)
- Helm 차트 직접 작성

## 완료 후 다음 단계 후보

- GKE 네트워킹 심화 (VPC, 방화벽)
- IAM / 권한 관리 (SA 실무 핵심)
- Terraform으로 인프라 코드화(IaC)
- ACE(Associate Cloud Engineer) 자격증 준비 연계
