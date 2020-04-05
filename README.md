# hanabi-net
 hanabi online

Is this something the world needs? No. Absolutely not. Especially considering that this already exists! Someone beat me to it.

But, I'm going to build it anyway for the sake of learning a bunch of technology.

# kubernetes deployment
Requires a `LoadBalancer` configured for Kubernetes cluster in order to assign an `EXTERNAL-IP` for the service.

**create a hanabi namespace**
```bash
$ kubectl create namespace hanabi-net
```

**apply yaml**
```bash
$ kubectl apply -f https://raw.githubusercontent.com/dja3/hanabi-net/david/hanabi_net_deployment.yaml
```

**locate the EXTERNAL-IP for service**
```bash
$ kubectl get services -n hanabi-net
NAME            TYPE           CLUSTER-IP    EXTERNAL-IP      PORT(S)        AGE
hanabi-net-ui   LoadBalancer   10.8.13.127   34.227.159.20   80:32156/TCP   32m
```

**Play Hanabi-net!**  
http://[EXTERNAL-IP]:80
