
interface PrestressedConcreteConfiguration {
    f_sd: number,
    f_cd: number,
    f_pd: number,
    A_sp: number,
    A_sm: number,

    H: number,
    d_sp: number,
    d_smc: number,
    b: number,
    A_smc: number
}

interface PrestressedConcreteResult {
    status: Boolean
}

/* interface CalcXParameters {
    eps_cu: number, dp: number, d_eps_ud: number
}

interface CalcTSallParameters {
    A_sm: number, A_sp: number, f_pd: number, f_sd: number
}

interface CalcCAllParameters {
    eps_ud: number,
    eps_cu: number,
    dp: number,
    f_cd: number,
    f_pd: number,
    f_sd: number,
    A_sm: number,
    b: number
} */

// Constants
const esp = 205000

// function calc_x(parameters: CalcXParameters): number {
//     const {eps_cu, dp, d_eps_ud} = parameters
//     return 0.8 * (eps_cu * dp / (eps_cu + d_eps_ud))
// }
/* function calc_epsilons((parameters: PrestressedConcreteConfiguration) {

} */


function calc_T_sall(parameters: PrestressedConcreteConfiguration) {
    const {A_sp, A_sm, f_pd, f_sd} = parameters
    const T_ult = A_sp * f_pd
    const T_usm = A_sm * f_sd
    const T_sall = T_usm + T_ult + f_sd
    return T_sall
}

function calc_C_all(parameters: PrestressedConcreteConfiguration) {
    const eps_ud = 0.02, eps_cu = 0.0035
    const { f_cd, f_pd, f_sd, A_sm, b, H, d_sp, A_smc } = parameters
    const dp = H - d_sp
    const d_eps_ud = eps_ud - (f_pd / esp)
    const x = 0.8 * (eps_cu * dp / (eps_cu + d_eps_ud))
    const A_c = b * x
    const C_ult = A_c * f_cd
    const C_usmc = A_smc * f_sd
    const C_all = C_usmc + C_ult
    return C_all
}

export function prestressedConcrete(parameters: PrestressedConcreteConfiguration): PrestressedConcreteResult {
    // Stage 1

    // Stretch Force

    const T_sall = calc_T_sall(parameters)

    // Stress Force

    const C_all = calc_C_all(parameters)

    // Comparing the forces 
    if (T_sall < C_all) {
        // State No. 1
        // Under Reinforced


    } else if (T_sall > C_all) {
        // State No. 2
    } else {
        // This should not happen
        // Therefore returns false
        return {status: false} 
    }

    return {status: false}
}

function underReinforcedConcrete(parameters: PrestressedConcreteConfiguration): any {
    const T_sall = calc_T_sall(parameters)
    const eps_ud = 0.02
    const {f_sd, f_cd, f_pd, A_sp, A_sm, A_smc, H, d_sp, b, d_smc} = parameters
    const d_eps_p = eps_ud - f_pd / esp
    // const d_eps_ud = eps_ud - (f_pd / esp)
    const dp = H - d_sp

    const eps_cu = ((T_sall - A_smc * f_sd) * d_eps_p) / (A_smc * f_sd + b * f_cd * 0.8 * dp - T_sall)
}

function overReinforcedConcrete(parameters: PrestressedConcreteConfiguration): any {
    const T_sall = calc_T_sall(parameters)
    const eps_cu = 0.0035
    const {f_sd, f_cd, f_pd, A_sp, A_sm, A_smc, H, d_sp, b, d_smc} = parameters

    const eps_pe = f_pd / esp
    const dp = H - d_sp

    let d_eps_p = eps_cu * (1 / (T_sall - A_smc * f_sd) / (A_smc * f_sd + b * f_cd * 0.8 * dp - T_sall))
    let eps_ud = eps_pe + d_eps_p
    // let d_eps_p = eps_ud - f_pd / esp

    if (eps_pe + d_eps_p <= eps_ud) {
        // Calculating stretch force for the elastic domain only
        const T_ult = A_sp * esp * (eps_pe )
    }
}






